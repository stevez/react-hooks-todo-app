import React from "react";
import Store from "../src/context";
import TodoForm from "../src/components/TodoForm";

import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'

test("<TodoForm /> #addTodo", async () => {
  const dispatch = jest.fn();
  render(
    <Store.Provider value={{ dispatch }}>
      <TodoForm />
    </Store.Provider>
  );
  
  userEvent.type(screen.getByRole('textbox'), "a new todo");
  userEvent.click(screen.getByRole('button'));

  expect(dispatch).toBeCalledWith({ type: "ADD_TODO", payload: "a new todo" });
});
