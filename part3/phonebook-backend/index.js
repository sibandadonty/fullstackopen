const express = require("express");

app = express()
const PORT = 3001;

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
    response.json(persons);
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

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
})