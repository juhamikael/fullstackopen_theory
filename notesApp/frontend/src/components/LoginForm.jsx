import React, { useState, useEffect, forwardRef } from "react";
import loginService from "../services/login";
import createAccountService from "../services/account";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import noteService from "../services/notes";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [createAccount, setCreateAccount] = useState(false);
  const [buttonDisabled, setbuttonDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    if (name.length < 3 || username.length < 3 || password.length < 3) {
      setbuttonDisabled(true);
    } else {
      setbuttonDisabled(false);
    }
  }, [name, username, password]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      noteService.setToken(user.token);
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log(exception);
      setErrorMessage("Wrong credentials, please try again");
      console.log("wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
    console.log("logging in with", username, password);
  };

  const handleCreateAccount = async (event) => {
    event.preventDefault();

    try {
      await createAccountService.createAccount({
        name,
        username,
        password,
      });
      setCreateAccount(false);
      setUsername("");
      setPassword("");
      setName("");
    } catch (exception) {
      setErrorMessage("Something went wrong");
      console.log("wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <>
      <h2 className="text-3xl">{createAccount ? "Create Account" : "Login"}</h2>
      {!createAccount && (
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            Username
            <Input
              id="username"
              data-testid="username"
              type="text"
              placeholder="Username"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            Password
            <Input
              id="password"
              data-testid="password"
              type="password"
              placeholder="Password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          {errorMessage && (
            <div
              id="error-message"
              className="text-destructive text-lg font-bold"
            >
              {errorMessage}
            </div>
          )}
          <div className="flex gap-x-2">
            <Button
              className={cn("bg-card-foreground hover:bg-card-foreground/80")}
              type="submit"
              data-testid="login-button"
              id="login-button"
            >
              Login
            </Button>
            <Button
              className={cn(
                "bg-card-foreground hover:bg-card-foreground/80 w-24 lg:w-fit"
              )}
              onClick={() => setCreateAccount(true)}
            >
              Create Account
            </Button>
          </div>
        </form>
      )}
      {createAccount && (
        <form onSubmit={handleCreateAccount} className="space-y-4">
          <div>
            Name
            <Input
              type="text"
              value={name}
              name="Name"
              placeholder="Name"
              onChange={({ target }) => setName(target.value)}
            />
          </div>
          <div>
            Username
            <Input
              type="text"
              value={username}
              name="Username"
              placeholder="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            Password
            <Input
              type="password"
              value={password}
              name="Password"
              placeholder="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <div className="flex gap-x-2">
            {buttonDisabled ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    className={cn(
                      "rounded-md text-muted px-2 font-medium text-sm w-24 lg:w-fit",
                      `${
                        buttonDisabled &&
                        "bg-card-foreground/50 hover:bg-card-foreground/50 "
                      }"`
                    )}
                    type="submit"
                    disabled={buttonDisabled}
                  >
                    Create Account
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Name, Username and Password must be at least 3 characters
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <Button
                className={cn(
                  "rounded-md text-muted px-2 font-medium text-sm bg-card-foreground hover:bg-card-foreground/80 w-24 lg:w-fit "
                )}
                type="submit"
              >
                Create Account
              </Button>
            )}

            <Button
              className={cn("bg-card-foreground hover:bg-card-foreground/80")}
              onClick={() => setCreateAccount(false)}
            >
              Login
            </Button>
          </div>
        </form>
      )}
    </>
  );
};

export default LoginForm;
