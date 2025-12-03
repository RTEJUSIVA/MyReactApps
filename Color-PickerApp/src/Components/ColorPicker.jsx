import React, { useState } from "react";

const ColorPicker = ({ getColor }) => {
  const [activecolor, setActiveColor] = useState("#555555");

  const handleColor = (e) => {
    setActiveColor(e.target.value);
    getColor(e.target.value);
  };

  return (
    <div className="mt-2">
      <div className="flex items-center justify-center w-75 gap-2">
        <input
          className="w-8 h-8"
          type="color"
          value={activecolor}
          onChange={handleColor}
        />
        <div className="text-md flex-1 text-black border border-gray-300 w-full text-center">
          {activecolor}
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
