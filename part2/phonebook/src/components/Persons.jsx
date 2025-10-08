import React from "react";

const Persons = ({ personsToShow }) => {
  return (
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
  );
};

export default Persons;
