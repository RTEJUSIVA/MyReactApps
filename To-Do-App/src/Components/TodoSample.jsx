import React, { useState, useEffect } from "react";

export default function TodoApp() {
  // Load saved items
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );

  const [text, setText] = useState("");

  // Save items whenever todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add item
  const addTodo = () => {
    if (!text.trim()) return;

    setTodos([...todos, { id: Date.now(), text, done: false }]);
    setText("");
  };

  // Toggle checkbox
  const toggleTodo = (id) => {
    setTodos(
      todos.map(t =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  };

  // Update item
  const updateTodo = (id) => {
    const newText = prompt("Enter new text:");
    if (!newText) return;

    setTodos(
      todos.map(t =>
        t.id === id ? { ...t, text: newText } : t
      )
    );
  };

  // Delete item
  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <div style={{ padding: "20px", width: "300px" }}>
      <h2>TO-DO APP</h2>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text"
      />

      <button onClick={addTodo}>Add</button>

      {todos.map(todo => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.done}
            onChange={() => toggleTodo(todo.id)}
          />

          {todo.text}

          <button onClick={() => updateTodo(todo.id)}>Update</button>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
