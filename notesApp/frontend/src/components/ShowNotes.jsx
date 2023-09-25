import { Button } from "./ui/button";
import Note from "./Note";
import { cn } from "../lib/utils";
import { useState } from "react";
import noteService from "../services/notes";

const ShowNotes = ({ notes, setNotes }) => {
  const [showAll, setShowAll] = useState(true);

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
    <div>
      <div className={cn("flex justify-end")}>
        <Button className={cn("w-1/3")} onClick={() => setShowAll(!showAll)}>
          Show {showAll ? "important" : "all"}
        </Button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default ShowNotes;
