import { useState, useEffect, useRef } from "react";
import { ThemeProvider } from "./components/theme-provider";

import noteService from "./services/notes";
import axios from "axios";

import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import ShowNotes from "./components/ShowNotes";
import NoteForm from "./components/NoteForm";

import Togglable from "./components/Togglable";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState(null);
  const noteFormRef = useRef();
  const authFormRef = useRef();

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  const hook = () => {
    axios.get("http://localhost:3001/api/notes").then((response) => {
      setNotes(response.data);
    });
  };

  useEffect(hook, []);

  return (
    <ThemeProvider>
      <Navbar user={user} />
      <div className="flex justify-center py-20">
        <div className="w-1/2">
          {!user && (
            <Togglable buttonLabel="Authenticate" user={user} ref={authFormRef}>
              <LoginForm setUser={setUser} user={user} ref={authFormRef} />
            </Togglable>
          )}
          {user && (
            <Togglable
              id="new-note-toggle"
              buttonLabel="New Note"
              user={user}
              ref={noteFormRef}
            >
              <NoteForm
                setNotes={setNotes}
                notes={notes}
                noteFormRef={noteFormRef}
              />
            </Togglable>
          )}
          <div className={`${user && "py-10"}`}>
            <ShowNotes notes={notes} setNotes={setNotes} />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};
export default App;
