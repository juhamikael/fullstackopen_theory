import { useState, useEffect } from "react";
import { cn } from "../lib/utils";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import noteService from "../services/notes";

const Form = ({ addNote, newNote, handleNoteChange }) => {
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (newNote.length > 5) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [newNote]);

  return (
    <form onSubmit={addNote} className={cn("w-full flex gap-x-4")}>
      <Input
        id="new-note"
        value={newNote}
        placeholder="a new note..."
        onChange={handleNoteChange}
        className={cn("focus-visible:ring-0")}
      />
      <Button
        disabled={disabled}
        className={cn("px-10")}
        type="submit"
        data-testid="save-button"
      >
        Save
      </Button>
    </form>
  );
};

const NoteForm = ({ setNotes, notes, noteFormRef }) => {
  const [newNote, setNewNote] = useState("");

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const addNote = (event) => {
    noteFormRef.current.toggleVisibility();

    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: true
    };

    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
  };

  return (
    <div className="input_form">
      <Form
        addNote={addNote}
        handleNoteChange={handleNoteChange}
        newNote={newNote}
      />
    </div>
  );
};

export default NoteForm;
