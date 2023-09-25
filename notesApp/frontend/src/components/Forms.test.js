import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginForm from "./LoginForm";
import NoteForm from "./NoteForm";
import userEvent from "@testing-library/user-event";
import noteService from "../services/notes";

let sharedToken = null;

test("<LoginForm/> updates parent state and calls onSubmit", async () => {
  let token = null;

  const mockSetUser = jest.fn((user) => {
    token = user.token;
    sharedToken = user.token;
    noteService.setToken(token);
  });

  render(<LoginForm setUser={mockSetUser} />);

  const usernameInput = screen.getByTestId("username");
  const passwordInput = screen.getByTestId("password");
  const loginButton = screen.getByTestId("login-button");

  await act(async () => {
    await userEvent.type(usernameInput, "Test1");
    await userEvent.type(passwordInput, "test");
    userEvent.click(loginButton);
  });

  await act(() => new Promise((resolve) => setTimeout(resolve, 0)));

  await act(async () => {
    await waitFor(() => expect(mockSetUser).toHaveBeenCalled());
  });
});

test("<NoteForm/> updates parent state and calls createNote", async () => {
  const noteFormRef = { current: { toggleVisibility: jest.fn() } };

  const setNotes = jest.fn();
  const notes = [];

  render(
    <NoteForm setNotes={setNotes} notes={notes} noteFormRef={noteFormRef} />
  );

  const noteInput = screen.getByPlaceholderText("a new note...");
  const submitButton = screen.getByTestId("save-button");

  await act(async () => {
    await userEvent.type(noteInput, "Test note longer than five characters");
    userEvent.click(submitButton);
  });
  await act(async () => {
    await waitFor(() => {
      // Check if toggleVisibility was called
      expect(noteFormRef.current.toggleVisibility).toHaveBeenCalled();

      // Check if setNotes was called to update the notes
      expect(setNotes).toHaveBeenCalled();
    });
  });
});
