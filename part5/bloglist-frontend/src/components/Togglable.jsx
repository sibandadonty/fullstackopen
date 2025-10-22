import React, { useState, useImperativeHandle } from "react";

const Togglable = (props) => {
  const [visiblility, setVisiblility] = useState(false);

  const toggleVisibility = () => {
    setVisiblility((prev) => !prev);
  };

  useImperativeHandle(props.ref, () => {
    return { toggleVisibility };
  });

  return (
    <div>
      <div style={{ display: visiblility ? "block" : "none" }}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
      <button
        style={{ display: visiblility ? "none" : "inline-block" }}
        onClick={toggleVisibility}
      >
        create new blog
      </button>
    </div>
  );
};

export default Togglable;
