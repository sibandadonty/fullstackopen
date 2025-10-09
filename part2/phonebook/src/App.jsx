import { useEffect, useState } from "react";
import SearchFilter from "./components/SearchFilter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
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
    axios.post("http://localhost:3001/persons", {
      name: newName,
      number: newNumber,
    }).then(response => {
      const data = response.data;
      setPersons([...persons, data]);
      
    });
    setNewName("");
    setNewNumber("");
  };

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      const persons = response.data;
      setPersons(persons);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <SearchFilter
            nameFilter={nameFilter}
            onSetNameFilter={setNameFilter}
          />
          <h2>Add new number</h2>
          <PersonForm
            newName={newName}
            newNumber={newNumber}
            onSetNewName={setNewName}
            onSetNewNumber={setNewNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  );
};

export default App;
