import { useState } from "react";
import "./App.css";
import ColorPicker from "./Components/ColorPicker";

function App() {
  const [color, setColor] = useState(null);

  const getColor = (clr) => {
    setColor(clr);
  };

  return (
    <>
      <div className="flex items-center justify-center w-screen h-screen overflow-hidden">
        <div className="flex items-center justify-center flex-col">
          <div className="text-3xl font-display mb-4 uppercase">
            Color Picker App
          </div>
          <div
            className="border border-gray-300 w-75 h-75"
            style={{ background: `${color}` }}
          ></div>
          <div className="flex w-full">
            <ColorPicker getColor={getColor} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
