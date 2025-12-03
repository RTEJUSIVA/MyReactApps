import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Pagination from "./Components/Pagination";
import StudentCRUD from "./Components/StudentCRUD";

function App() {
  return (
    <>
      <StudentCRUD />
    </>
  );
}

export default App;
