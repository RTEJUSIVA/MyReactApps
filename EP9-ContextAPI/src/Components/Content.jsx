import React, { useState } from "react";

const Content = () => {
  let [items, setItems] = useState([
    { id: 1, label: "HTML & CSS", checked: true },
    { id: 1, label: "Javascript", checked: true },
    { id: 1, label: "React Js", checked: false },
  ]);
  return (
    <ul>
      {items.map((item) => {
        return (
          <li>
            <input type="checkbox" />
            <label>{item.label}</label>
          </li>
        );
      })}
    </ul>
  );
};

export default Content;
