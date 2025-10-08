import React from "react";

const PersonForm = ({newName, newNumber, onSetNewName ,onSetNewNumber}) => {
  return (
    <div>
      <div>
        name:{" "}
        <input value={newName} onChange={(e) => onSetNewName(e.target.value)} />
      </div>
      <div>
        number:{" "}
        <input
          value={newNumber}
          onChange={(e) => onSetNewNumber(e.target.value)}
        />
      </div>
    </div>
  );
};

export default PersonForm;
