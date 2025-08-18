import { useState } from "react";
import CreateFile from "./Components/CreateFile";
import ReadFile from "./Components/ReadFile";
import DeleteFile from "./Components/DeleteFile";
import Update from "./Components/Update";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CreateFile />} />
          <Route path="/read" element={<ReadFile />} />
          <Route path="/delete" element={<DeleteFile />} />
          <Route path="/update" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
