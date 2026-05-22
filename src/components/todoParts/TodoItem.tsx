import React from "react";

const TodoItem = ({ isDone, desc }) => {
  return (
    <div className="todoItem">
      <input type="checkbox" checked={isDone} /> <p>{desc}</p>
    </div>
  );
};

export default TodoItem;
