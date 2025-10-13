require("dotenv").config();
const express = require("express");
var morgan = require('morgan')
const cors = require("cors");
const Person = require("./models/person");

app = express()
app.use(express.json())
app.use(cors());
app.use(express.static("dist"))
morgan.token("data", (req, res) => {
    return JSON.stringify(req.body);
})
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :data"))
const PORT = process.env.PORT || 3001;

const persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

app.get("/api/persons", (request, response) => {
    Person.find({}).then(persons => {
      response.json(persons);
    })
}) 

app.get("/info", (request, response) => {
    const res = `
      <p>Phonebook has information for ${persons.length} people</p>
      <p>${new Date()}</p>
    `
    response.send(res);
})

app.get("/api/persons/:id", (request, response) => {
   const personId = request.params.id;
   const person = persons.find(person => person.id === personId);

   if (!person) {
      return response.status(404).json({
        message: `User with id ${personId} not found`
      })
   }

   response.json(person);
})

app.delete("/api/persons/:id", (request, response) => {
   const personId = request.params.id;
   const person = persons.find(person => person.id === personId);

   if (!person) {
      return response.status(404).json({
        message: `User with id ${personId} not found`
      })
   }

   const updatedPersonList = persons.filter(person => person.id !== personId)
   response.json(updatedPersonList);
})

app.post("/api/persons", (request, response) => {
   const body = request.body;
   const {name, number} = body;
   const person = {id: Math.floor(Math.random() * 1000), ...body}

   if (!name) {
     return response.status(400).json({ error: 'name is missing'})
   }   
     if (!number) {
     return response.status(400).json({ error: "number is missing"})
   }
   
  console.log("Value for persons before finding if person exist: ", persons);
  

   const personExist = persons.findIndex(person => person.name === name);
   console.log("Value for person exist: ", personExist);
   
   if (personExist !== -1) {
      response.status(400).json({error: "person already exist"})
      return;
   }
   
   response.json(persons.concat(person))
})

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
})