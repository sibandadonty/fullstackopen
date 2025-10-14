const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

mongoose.connect(process.env.MONGODB_DB_URL)
  .then(() => {
    console.log('Database connection successful')
  })
  .catch(err => {
    console.log('Failed to connect to the database', err)
  })

const personSchema = mongoose.Schema({
  name: {
    type: String,
    // minLength: 3
  },
  number: Number
})

personSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
  }
})

module.exports = mongoose.model('Person', personSchema)