import React from "react";

const TodoItem = ({ isDone, desc, handleDelItem }) => {
  return (
    <div className="todoItem">
      <input type="checkbox" checked={isDone} /> <p>{desc}</p>
      <button onClick={handleDelItem}>x</button>
    </div>
  );
};

export default TodoItem;
