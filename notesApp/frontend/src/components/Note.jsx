import React from "react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
const Note = ({ note, toggleImportance }) => {
  const label = note.important ? "Make not important" : "Make important";

  return (
    <div
      className="flex justify-center border rounded-xl my-4"
      data-testid="note"
    >
      <li className="grid grid-cols-2 items-center p-4 w-full">
        <span className="text-center">{note.content}</span>
        <Button
          id="toggle-importance"
          className={cn(
            `${
              note.important
                ? "bg-red-400 hover:bg-red-400/80 transition-all"
                : "bg-green-600 hover:bg-green-600/80 transition-all"
            }`
          )}
          onClick={toggleImportance}
        >
          {label}
        </Button>
      </li>
    </div>
  );
};

export default Note;
