import React from "react";

const Tasklist = ({ tasks, toggleTask, deleteTask }) => {
  return (
    <div>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index}>
            <span
              onClick={() => toggleTask(task.id)}
              className={task.completed ? "completed" : ""}
            >
              {task.text}
            </span>
            <span onClick={() => deleteTask(task.id)} className="delete">
              X
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasklist;
