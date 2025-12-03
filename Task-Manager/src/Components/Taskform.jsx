import React, { useState } from "react";

const Taskform = ({ addTask }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      console.log("Form Submitted!", value);
      addTask(value);
      setValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          value={value}
          placeholder="Enter a Text"
          className="add-task-input"
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit" className="add-task-btn">
          Add Task
        </button>
      </div>
    </form>
  );
};

export default Taskform;
