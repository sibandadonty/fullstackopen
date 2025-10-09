import React from "react";

const Persons = ({ personsToShow, onDelete }) => {
  return (
    <div>
      {personsToShow.map((person) => {
        return (
          <div key={person.name}>
            <div>
              <p style={{ display: "inline-block", marginRight: "5px" }}>
                {person.name} {person.number}
              </p>
              <button onClick={() => onDelete(person.id)}>delete</button>
            </div>
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default Persons;
