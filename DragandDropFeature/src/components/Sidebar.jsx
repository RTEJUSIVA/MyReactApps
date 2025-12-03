// src/Sidebar.jsx
import React from "react";

const Sidebar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside style={{ width: 200, padding: 10, background: "#f4f4f4", borderRight: "1px solid #ccc", height: "100vh" }}>
      <h4>Node Types</h4>
      <div
        onDragStart={(e) => onDragStart(e, "customNode")}
        draggable
        style={{ border: "1px solid #999", borderRadius: 5, padding: 10, marginBottom: 10, background: "#fff", cursor: "grab" }}
      >
        Custom Node
      </div>
    </aside>
  );
};

export default Sidebar;
