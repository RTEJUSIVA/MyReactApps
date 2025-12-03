import React, { useState } from "react";
import { toast } from "react-toastify";

const TodoInside = ({ items, setItems }) => {
  const [input, setInput] = useState("");
  const [newitem, setNewitem] = useState(null);
  const [isediting, setIsEditing] = useState(false);
  const [currentID, setCurrentID] = useState(null);

  const handleCreateorSave = () => {
    if (isediting) {
      const editedItems = items.map((item) => {
        return currentID === item.id ? { ...item, label: input } : item;
      });
      setItems(editedItems);
      setCurrentID(null);
      setNewitem("");
      setIsEditing(false);
      setInput("");
      toast.success("Item Saved!");
    } else {
      setItems([
        ...items,
        {
          id: items.length + 1,
          label: input,
          checked: false,
        },
      ]);
      toast.success("Item added!");
      setInput("");
    }
  };

  const handleCheck = (id) => {
    let newListItems = items.map((item) => {
      return item.id === id ? { ...item, checked: !item.checked } : item;
    });

    setItems(newListItems);
  };

  const handleDelete = (id) => {
    const listnewItems = items
      .filter((item) => {
        return item.id !== id;
      })
      .map((item, index) => {
        return { ...item, id: index + 1 };
      });
    setItems(listnewItems);
    toast.error("Item deleted!");
  };

  const handleUpdate = (id) => {
    const newUpdateItems = items.find((item) => id === item.id);
    setInput(newUpdateItems.label);
    setIsEditing(true);
    setCurrentID(id);
    toast.info("Item updated!");
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="px-2 py-12 w-xl text-center items-center justify-center">
          <div className="bg-cyan-800  rounded-t-lg font-display text-2xl text-white uppercase border-2 border-blue-800 px-2 py-2">
            To-do App
          </div>
          <div className="bg-gray-100  rounded-b-lg font-display text-gray-800 border-t-0 border-b border-r border-l pt-3  border-blue-800">
            <div className="flex items-center justify-center">
              <input
                className="border-blue-800 border rounded-lg px-3 py-1"
                type="text"
                value={input}
                placeholder="Enter Text"
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              />
              <button
                onClick={handleCreateorSave}
                className="bg-blue-800 cursor-pointer px-3 py-1 text-white rounded-lg border"
              >
                {isediting ? "Save" : "Add"}
              </button>
            </div>
            <ul className="mt-4 mb-4">
              {items.map((item, index) => {
                return (
                  <li
                    key={index}
                    className="flex items-center justify-center gap-2"
                  >
                    <span className="text-left items-start">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => {
                          handleCheck(item.id);
                        }}
                      />
                    </span>
                    <span className="text-left items-start">{item.label}</span>
                    <button
                      className="bg-green-800 cursor-pointer px-3 py-1 text-white rounded-lg border"
                      onClick={() => {
                        handleUpdate(item.id);
                      }}
                    >
                      Update
                    </button>
                    <button
                      onClick={() => {
                        handleDelete(item.id);
                      }}
                      className="bg-red-800 cursor-pointer px-3 py-1 text-white rounded-lg border"
                    >
                      Delete
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoInside;
