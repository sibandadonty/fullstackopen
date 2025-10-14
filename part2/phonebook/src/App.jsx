import { useEffect, useState } from "react";
import SearchFilter from "./components/SearchFilter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";
import personsService from "./services/persons";
import "./index.css";
import Notification from "./components/Notification";
import ErrorMessage from "./components/ErrorMessage";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [notification, setNotification] = useState();
  const [error, setError] = useState();

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
      const replaceNumber = confirm(
        `${newName} is already added to phonebook, replace the old number with the new one?`
      );
      if (replaceNumber) {
        const index = persons.findIndex((person) => person.name === newName);

        personsService
          .updatePersonNumber(persons[index].id, {
            number: newNumber,
          })
          .then((res) =>
            setPersons(
              persons.map((person) =>
                person.id === persons[index].id ? res.data : person
              )
            )
          )
          .catch((error) => {
            console.log(
              "Error message after trying to updated user deleted in one browser: ",
              error
            );
            console.log("Status code: ", error.status);

            if (error.status === 404) {
              setError(`Information for ${newName} has already been removed`);
              setTimeout(() => {
                setError(undefined);
              }, 5000);
            } else {
              setNotification("phone number updated successfully");

              setTimeout(() => {
                setNotification(undefined);
              }, 5000);
            }
          });
      }
      return;
    }

    personsService
      .addPerson({
        name: newName,
        number: newNumber,
      })
      .then((person) => {
        setPersons(person);
        setNotification("New person added successfully");
      })
      .catch((error) => {
        console.log(error.response.data.error);
        setNotification(error.response.data.error);
        setTimeout(() => {
          setNotification(undefined);
        }, 5000);
      });

    setTimeout(() => {
      setNotification(undefined);
    }, 5000);
    setNewName("");
    setNewNumber("");
  };

  useEffect(() => {
    personsService.getPersons().then((persons) => setPersons(persons));
  }, []);

  const handleDeletePerson = (id) => {
    if (window.confirm(`Are you sure you want to delete user with id ${id}`)) {
      personsService
        .deletePerson(id)
        .then((person) =>
          setPersons(persons.filter((person) => person.id !== id))
        );
      setNotification("Person removed successfully");
      setTimeout(() => {
        setNotification(undefined);
      }, 5000);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} className="notification-container" />
      <ErrorMessage message={error} className="notification-container-error" />
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
      <Persons personsToShow={personsToShow} onDelete={handleDeletePerson} />
    </div>
  );
};

export default App;
