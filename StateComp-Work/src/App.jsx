import { useState } from "react";
import Content from "./Content";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";

function App() {
  return (
    <>
      <div className="container">
        <Header />
        <Content />
        <Footer />
      </div>
    </>
  );
}

export default App;
