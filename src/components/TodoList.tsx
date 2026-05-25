import { useState, useEffect } from "react";
import axios from "axios";

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
      axios
        .post("http://localhost:4106/todolist/addListItem", {
          description: newTodo,
        })
        .catch((error) => {
          console.error(error);
        });
    })();
  };

  useEffect(() => {
    const getListItems = async () => {
      const res = await axios.get(
        "http://localhost:4106/todolist/getListItems",
        {
          timeout: 5000,
        },
      );
      const todoList: todoItem[] = res.data.map((item) => ({
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
