import { useDispatch, useSelector } from "react-redux";
import { toggleImportanceOf } from "../reducers/noteReducer";
import noteService from "../services/notes";
const Note = ({ note, handleClick }) => {
  return (
    <li
      onClick={handleClick}
      className="grid grid-cols-2 cursor-pointer p-4 rounded-lg shadow-md hover:bg-gray-100/20 transition-all"
    >
      <span className="text-lg font-semibold">{note.content}</span>
      <span
        className={`ml-8 ${
          note.important ? "text-green-400" : "text-red-300"
        } text-center`}
      >
        {note.important ? "important" : "not important"}
      </span>
    </li>
  );
};

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector(({ filter, notes }) => {
    if (filter === "ALL") {
      return notes;
    }
    return filter === "IMPORTANT"
      ? notes.filter((note) => note.important)
      : notes.filter((note) => !note.important);
  });

  const handleToggleImportance = (id) => {
    dispatch(toggleImportanceOf(id));
  };

  return (
    <ul className="list-disc px-8 my-5 space-y-4 min-w-full min-h-[50px]">
      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          handleClick={() => handleToggleImportance(note.id)}
        />
      ))}
    </ul>
  );
};
export default Notes;
