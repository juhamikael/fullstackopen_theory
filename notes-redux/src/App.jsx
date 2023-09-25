import NewNote from "./components/NewNote";
import Notes from "./components/Notes";
import VisibilityFilter from "./components/VisibilityFilter";
import { useEffect } from "react";
import { initializeNotes } from "./reducers/noteReducer";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeNotes());
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-1/3">
        <div className="flex flex-col">
          <NewNote />
          <VisibilityFilter />
          <Notes />
        </div>
      </div>
    </div>
  );
};
export default App;
