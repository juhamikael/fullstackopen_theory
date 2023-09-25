import React from "react";
import "@testing-library/jest-dom";
import { getByTestId, render, screen } from "@testing-library/react";
import Note from "./Note";
import Togglable from "./Togglable";
import userEvent from "@testing-library/user-event";

describe("<Note />", () => {
  test("renders content", () => {
    const note = {
      content: "Component testing is done with react-testing-library",
      important: true,
    };

    const { container } = render(<Note note={note} id="note" />);

    const div = getByTestId(container, "note");

    expect(div).toHaveTextContent(
      "Component testing is done with react-testing-library"
    );
  });
  test("clicking the button calls event handler once", async () => {
    const note = {
      content: "Component testing is done with react-testing-library",
      important: true,
    };

    const mockHandler = jest.fn();

    render(<Note note={note} toggleImportance={mockHandler} />);

    const user = userEvent.setup();
    const button = screen.getByText("Make not important");
    await user.click(button);

    expect(mockHandler.mock.calls).toHaveLength(1);
  });
});
