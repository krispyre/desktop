import { useState } from "react";
import "./todolist.css";
import TodoItem from "./todoParts/TodoItem";

type todoItem = {
  isDone: boolean;
  desc: string;
};

const TodoList = () => {
  const [todoItems, setTodoItems] = useState<todoItem[]>([
    { isDone: true, desc: "do stuff" },
  ]);

  const handleAddItem = () => {
    console.warn("add item, update to db, success/fail");
  };
  return (
    <div className="todo widget">
      <select id="listName">
        <option>List</option>
      </select>
      <hr />
      <div id="listBody">
        <div id="listItems">
          {todoItems.map((todo) => (
            <TodoItem isDone={todo.isDone} desc={todo.desc} />
          ))}
        </div>
        <button id="addItem" onClick={handleAddItem}>
          add item
        </button>
      </div>
    </div>
  );
};

export default TodoList;
