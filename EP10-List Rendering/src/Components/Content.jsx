import React, { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdAddCircleOutline } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";

const Content = () => {
  let [items, setItems] = useState([
    { id: 1, label: "HTML & CSS", checked: true },
    { id: 2, label: "Javascript", checked: true },
    { id: 3, label: "React JS", checked: false },
    { id: 4, label: "Bootstrap", checked: false },
    { id: 5, label: "Jquery", checked: true },
  ]);

  let [newItem, setNewitem] = useState("");

  let [isEditing, setIsEditing] = useState(false);

  let handleChecked = (id) => {
    let newListItems = items.map((item) => {
      return item.id === id ? { ...item, checked: !item.checked } : item;
    });
    setItems(newListItems);
  };

  let handleUpdate = () => {
    setIsEditing(true);
  };

  let handleDelete = (id) => {
    let newItems = items
      .filter((item) => item.id !== id)
      .map((item, index) => {
        return { ...item, id: index + 1 };
      });
    setItems(newItems);
  };

  let handleAddorSaveItem = () => {
    setItems([
      ...items,
      { id: items.length + 1, label: newItem, checked: false },
    ]);
  };

  return (
    <main>
      <input
        type="text"
        value={newItem}
        placeholder="Add New Item"
        onChange={(e) => {
          setNewitem(e.target.value);
        }}
      />

      <button onClick={handleAddorSaveItem}>
        {isEditing ? "Save" : "Add"}
      </button>
      
      {items.map((item) => {
        return (
          <li key={item.id} style={{ listStyleType: "none" }}>
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => handleChecked(item.id)}
            />
            <label>{item.label}</label>
            <FaUserEdit
              style={{ cursor: "pointer" }}
              role="button"
              tabIndex={0}
              onClick={handleUpdate}
            />
            <RiDeleteBin5Line
              style={{ cursor: "pointer" }}
              role="button"
              tabIndex={0}
              onClick={() => handleDelete(item.id)}
            />
          </li>
        );
      })}
    </main>
  );
};

export default Content;
