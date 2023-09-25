import { useEffect } from "react";
import { useState } from "react";
import _ from "lodash";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
const Navbar = ({ user }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const getLocalStorage = () => {
    const loggedIn = localStorage.getItem("loggedNoteappUser");
    if (loggedIn) {
      setLoggedIn(true);
    }

    return loggedIn;
  };

  useEffect(() => {
    getLocalStorage();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedNoteappUser");
    setLoggedIn(false);
    window.location.reload();
  };

  return (
    <nav className="flex justify-center py-4 px-4">
      <div>
        <h1 className="text-3xl ">Notes App</h1>
        <h2 className="text-center text-sm">Fullstack Open 2023</h2>
      </div>
      <div className="absolute right-0 px-4">
        {user && (
          <div className="flex items-center space-x-4">
            <p className="items-center flex">{_.capitalize(user.name)}</p>
            <Button className={cn("rounded-xl")} onClick={handleLogout}>
              Logout
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
