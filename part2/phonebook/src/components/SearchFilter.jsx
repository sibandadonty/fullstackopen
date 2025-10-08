import React from "react";

const SearchFilter = ({nameFilter, onSetNameFilter}) => {
  return (
    <div>
      filter shown with{" "}
      <input
        type="text"
        value={nameFilter}
        onChange={(e) => onSetNameFilter(e.target.value)}
      />
    </div>
  );
};

export default SearchFilter;
