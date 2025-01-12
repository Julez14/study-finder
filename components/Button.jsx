import React from "react";
import "./Button.css";

const Button = ({ onClick }) => {
  return (
    <button className="add-button" onClick={onClick}>
      <span className="plus-icon">+</span>
      Add
    </button>
  );
};

export default Button;
