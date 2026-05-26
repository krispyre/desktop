import { useState, useEffect } from "react";
import axios from "axios";

import "./todolist.css";
import TodoItem from "./todoParts/TodoItem";

type todoItem = {
  isDone: boolean;
  desc: string;
  id: number;
};

const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todoItems, setTodoItems] = useState<todoItem[]>([
    { isDone: true, desc: "do stuff", id: -1 },
  ]);

  const handleAddItem = () => {
    console.warn("add item, update to db, success/fail");

    (async () => {
      const res = await axios
        .post("http://localhost:4106/todolist/addListItem", {
          description: newTodo,
        })
        .catch((error) => {
          console.error(error);
        });

      if (res.status == 201) {
        setTodoItems((prev) => [
          ...prev,
          { isDone: false, desc: newTodo, id: res.data.id },
        ]);
      }
    })();
  };

  const handleDelItem = (id) => {
    const delItem = async () => {
      const res = await axios.delete(
        "http://localhost:4106/todolist/delListItem",
        {
          params: {
            id,
          },
        },
      );
      if (res.status == 200) {
        setTodoItems((prev) => prev.filter((item) => item.id != res.data.id));
      }
    };

    delItem();
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
        id: item.todo_id,
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
            <TodoItem
              key={todo.id}
              isDone={todo.isDone}
              desc={todo.desc}
              handleDelItem={() => handleDelItem(todo.id)}
            />
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
          <button id="addItem" onClick={handleAddItem} disabled={newTodo == ""}>
            add item
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
