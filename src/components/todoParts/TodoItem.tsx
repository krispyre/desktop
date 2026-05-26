import React from "react";

const TodoItem = ({ isDone, desc, handleDelItem, handleUpdateItem }) => {
  const handleDescChange = (e) => {
    handleUpdateItem(e.target.value);
  };

  return (
    <div className="todoItem">
      <input type="checkbox" checked={isDone} />{" "}
      <input type="text" value={desc} onChange={handleDescChange} />
      <button onClick={handleDelItem}>x</button>
    </div>
  );
};

export default TodoItem;
