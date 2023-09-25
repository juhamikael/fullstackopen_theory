import { useDispatch } from "react-redux";
import { createNote } from "../reducers/noteReducer";

const NewNote = () => {
  const dispatch = useDispatch();

  const addNote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";

    dispatch(createNote(content));
  };

  return (
    <form
      onSubmit={addNote}
      className="flex my-8 gap-x-4 justify-center w-full"
    >
      <input
        className="flex-grow border-2 border-gray-300 p-2 rounded-lg"
        name="note"
      />
      <button className="btn bg-white px-4 py-2 rounded-lg" type="submit">
        add
      </button>
    </form>
  );
};
export default NewNote;
