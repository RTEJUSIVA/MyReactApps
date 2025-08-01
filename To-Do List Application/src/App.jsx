import { useState } from "react";
import "./App.css";
import FormComponents from "./formComponents";
import Header from "./Header";

function App() {
  return (
    <>
      <main>
        <div className="container-fluid">
          <div
            className="container"
            style={{ border: "2px solid #ccc", paddingBottom: "25px" }}
          >
            <Header />
            <div className="row" style={{ marginTop: "25px" }}></div>
            <FormComponents />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
