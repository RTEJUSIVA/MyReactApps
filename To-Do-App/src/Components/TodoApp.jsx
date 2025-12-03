import React, { useState, useEffect } from "react";
import TodoInside from "./TodoInside";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const STORAGE_KEY = "todo-items";

const TodoApp = () => {
  // Load from localStorage first, else use your default list
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved); // JSON String -> Javascript Object/ Array
    }
    return [
      { id: 1, label: "HTML and CSS", checked: false },
      { id: 2, label: "Javascript", checked: false },
      { id: 3, label: "React JS", checked: true },
    ];
  });

  // Whenever items change, save them
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  return (
    <>
      <TodoInside items={items} setItems={setItems} />
      <ToastContainer position="top-right" autoClose={1500} />
    </>
  );
};

export default TodoApp;
