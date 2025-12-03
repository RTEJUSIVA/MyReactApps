// src/EdgeTooltip.jsx
import React from "react";

const Tooltip = ({ visible, x, y, data, onDataChange }) => {
  if (!visible) return null;

  const updateCell = (row, col, value) => {
    const updated = {
      ...data,
      table: [
        ...(data.table || [
          ["", ""],
          ["", ""],
        ]),
      ],
    };
    updated.table[row][col] = value;
    onDataChange(updated);
  };

  const table = data.table || [
    ["", ""],
    ["", ""],
  ];

  return (
    <div
      style={{
        position: "fixed",
        top: y + 10,
        left: x,
        background: "white",
        border: "1px solid #ccc",
        padding: 10,
      }}
    >
      <table>
        <tbody>
          {table.map((row, rIdx) => (
            <tr key={rIdx}>
              {row.map((cell, cIdx) => (
                <td key={cIdx}>
                  <input
                    value={cell}
                    onChange={(e) => updateCell(rIdx, cIdx, e.target.value)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tooltip;
