import React, { useState } from "react";
import Taskform from "./Taskform";
import Tasklist from "./Tasklist";

const Taskmanager = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (text) => {
    const newTask = { id: Date.now(), text, completed: false };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) => {
        return task.id == id ? { ...task, completed: !task.completed } : task;
      })
    );
  };

  const deleteTask = (id) => {
    const filteredTasks = tasks.filter((task) => {
      return task["id"] !== id;
    });
    setTasks(filteredTasks);
  };

  return (
    <div>
      <h1>TaskManager</h1>
      <Taskform addTask={addTask} />
      <Tasklist tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} />
      <p>Tasks: {tasks.length}</p>
    </div>
  );
};

export default Taskmanager;
