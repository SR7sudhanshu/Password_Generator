import React from "react";

const NotificationBar = ({ message, isVisible }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: isVisible ? "20px" : "-300px", // Slide in and out
        transition: "right 0.5s ease",
        background: "#4caf50",
        color: "white",
        padding: "10px 20px",
        borderRadius: "5px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
      }}
    >
      {message}
    </div>
  );
};

export default NotificationBar;
