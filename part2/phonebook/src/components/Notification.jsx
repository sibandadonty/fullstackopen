import React from "react";

const Notification = ({ message }) => {
  if (message === undefined) {
    return null;
  }

  return (
    <div className="notification-container">
      <p>{message}</p>
    </div>
  );
};

export default Notification;
