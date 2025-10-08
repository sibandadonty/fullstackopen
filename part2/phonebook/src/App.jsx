import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  const personExist = (name) => {
    const res = persons.findIndex((person) => person.name === name);
    return res !== -1 ? true : false;
  };

  const filteredPersons = persons.filter((person) => {
    return person.name.includes(nameFilter);
  });

  const personsToShow = nameFilter !== "" ? filteredPersons : persons;

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (personExist(newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    setPersons([...persons, { name: newName, number: newNumber }]);
    setNewName("");
    setNewNumber("");
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <div>
            filter shown with{" "}
            <input
              type="text"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
            />
          </div>
          <h2>Add new number</h2>
          <div>
            name:{" "}
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <div>
            number:{" "}
            <input
              value={newNumber}
              onChange={(e) => setNewNumber(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {personsToShow.map((person) => {
          return (
            <div key={person.name}>
              <p>
                {person.name} {person.number}
              </p>
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
