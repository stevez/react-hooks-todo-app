import React from "react";
import Store from "../src/context";
import reducer from "../src/reducer";
import TodoList from "../src/components/TodoList";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'

test("<TodoList /> #display", async () => {
  const todos = ["a", "b", "c"];
  const dispatch = () => {};
  render(
    <Store.Provider value={{ state: { todos }, dispatch }}>
      <TodoList />
    </Store.Provider>
  );
  const list = screen.getAllByRole("listitem");
  expect(list.length).toEqual(3);
});

test("<TodoList /> #completeCalls", async () => {
  const todos = ["a", "b", "c"];
  const dispatch = jest.fn();
 render(
    <Store.Provider value={{ state: { todos }, dispatch }}>
      <TodoList />
    </Store.Provider>
  );

  const buttons = screen.getAllByRole("button")
  buttons.forEach(b => userEvent.click(b));
  expect(dispatch.mock.calls.length).toBe(3);
});

test("<TodoList /> #completeMutates", async () => {
  let state = { todos: ["a", "b", "c"] };
  const dispatch = action => {
    state = reducer(state, action);
  };
  render(
    <Store.Provider value={{ state, dispatch }}>
      <TodoList />
    </Store.Provider>
  );

  const buttons = screen.getAllByRole("button")
  userEvent.click(buttons[buttons.length -1]);
  
  expect(state.todos.length).toBe(2);
  expect(state.todos).toEqual(["a", "b"]);
});
