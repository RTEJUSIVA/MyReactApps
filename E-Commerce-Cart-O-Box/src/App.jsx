import { useState } from "react";
import Home from "./components/Home";
import About from "./components/About";
import Products from "./components/Products";
import Login from "./components/Login";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Contact from "./components/Contact";
import Navibar from "./components/Navibar";
import CreateProduct from "./components/CreateProduct";

function App() {
  return (
    <>
      <div>
        <Router>
          <Navibar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/createproduct" element={<CreateProduct />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
