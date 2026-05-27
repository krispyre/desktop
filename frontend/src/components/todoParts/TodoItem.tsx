import React from "react";

const TodoItem = ({
  isDone,
  desc,
  handleDelItem,
  handleUpdateDesc,
  handleUpdateIsDone,
}) => {
  const handleIsDoneChange = (e) => {
    handleUpdateIsDone(e.target.checked);
  };

  const handleDescChange = (e) => {
    handleUpdateDesc(e.target.value);
  };

  return (
    <div className="todoItem">
      <input type="checkbox" checked={isDone} onChange={handleIsDoneChange} />
      <input type="text" value={desc} onChange={handleDescChange} />
      <button onClick={handleDelItem}>x</button>
    </div>
  );
};

export default TodoItem;
