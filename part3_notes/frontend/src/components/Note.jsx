import React from "react";
import "../App.css";
const Note = ({ note, toggleImportance }) => {
  const label = note.important ? "make not important" : "make important";

  return (
    <li className="list_item">
      <span>{note.content}</span>
      <button
        className="custom_button"
        style={{ backgroundColor: note.important ? "#f44336" : "#4caf50" }}
        onClick={toggleImportance}
      >
        {label}
      </button>
    </li>
  );
};

export default Note;
