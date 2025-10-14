require('dotenv').config()
const express = require('express')
var morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')


const errorHandler = (error, request, response, next) => {
  console.error(error)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    console.log('Takudzosa validation error racho horaiti:')

    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('dist'))
morgan.token('data', (req) => {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
  Person.find({}).then(result => {
    const res = `
        <p>Phonebook has information for ${result.length} people</p>
        <p>${new Date()}</p>
      `
    response.send(res)
  })
})

app.get('/api/persons/:id', (request, response) => {
  const personId = request.params.id
  Person.findById(personId).then(person => {
    if (!person) {
      return response.status(404).json({
        message: `User with id ${personId} not found`
      })
    }
    response.json(person)
  })

})

app.delete('/api/persons/:id', (request, response) => {
  const personId = request.params.id
  Person.findByIdAndDelete(personId).then(() => {
    response.status(204).end()
  }).catch(err => console.log(err.message))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  const { name, number } = body

  if (!name) {
    return response.status(400).json({ error: 'name is missing' })
  }
  if (!number) {
    return response.status(400).json({ error: 'number is missing' })
  }

  Person.find({ name }).then(person => {

    if (person.length < 1) {
      const new_person = new Person({
        name, number
      })
      new_person.save().then(res => {
        response.json(res)
      }).catch(err => {
        console.log('Error after saving the user for the first time: ', err)
        next(err)
      })
    } else {
      person[0].number = number
      person[0].save().then(updatedPerson => {
        response.json(updatedPerson)
      }).catch(err => {
        console.log('Error after updating the user: ', err)

        next(err)
      })
    }
  }).catch(err => {
    console.log('Global find error before updating or adding user: ', err)
    next(err)
  })
})

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
})