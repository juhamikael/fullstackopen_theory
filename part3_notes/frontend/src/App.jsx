import { useState, useEffect } from "react";
import "./App.css";
import Note from "./components/Note";
import axios from "axios";
import noteService from "./services/notes";


const Form = ({ addNote, newNote, handleNoteChange }) => {
  return (
    <form onSubmit={addNote} className="input_form">
      <input
        value={newNote}
        onChange={handleNoteChange}
        className="note_input"
      />
      <button
        type="submit"
        className="custom_button"
        style={{
          backgroundColor: "#4caf50",
          width: "100px",
        }}
      >
        Save
      </button>
    </form>
  );
};

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);

  const hook = () => {
    axios.get("http://localhost:3001/notes").then((response) => {
      setNotes(response.data);
    });
  };
  useEffect(hook, []);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    };

    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
  };

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService.update(id, changedNote).then((returnedNote) => {
      setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
    });
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  return (
    <div className="app_container">
      <h1 className="title">Notes</h1>
      <div className="flex_container">
        <button
          className="custom_button"
          style={{
            backgroundColor: showAll
              ? // Blue
                "#2dd4bf"
              : "#ec4899",
          }}
          onClick={() => setShowAll(!showAll)}
        >
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul className="note_list">
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <div className="input_form">
        <Form
          addNote={addNote}
          handleNoteChange={handleNoteChange}
          newNote={newNote}
        />
      </div>
    </div>
  );
};
export default App;
