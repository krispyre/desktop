import { useState, useEffect } from "react";
import "./todolist.css";
import TodoItem from "./todoParts/TodoItem";

type todoItem = {
  isDone: boolean;
  desc: string;
};

const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todoItems, setTodoItems] = useState<todoItem[]>([
    { isDone: true, desc: "do stuff" },
  ]);

  const handleAddItem = () => {
    console.warn("add item, update to db, success/fail");

    (async () => {
      const res = await fetch("http://localhost:4106/todolist/addListItem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Tells the server to expect JSON data
        },
        body: JSON.stringify({
          description: newTodo,
        }),
      });
      if (!res.ok) {
        throw new Error("Bruh add item fail");
      }
    })();
  };

  useEffect(() => {
    const getListItems = async () => {
      const res = await fetch("http://localhost:4106/todolist/getListItems");
      if (!res.ok) {
        throw new Error("Brouh");
      }
      const items = await res.json();
      const todoList: todoItem[] = items.map((item) => ({
        isDone: item.is_done,
        desc: item.description,
      }));

      setTodoItems(todoList);
    };

    getListItems();
  }, []);
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
        <div id="addTodo">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => {
              setNewTodo(e.target.value);
            }}
            placeholder="add a new item..."
          />
          <button id="addItem" onClick={handleAddItem}>
            add item
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
