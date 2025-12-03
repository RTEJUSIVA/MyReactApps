import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";

function App() {
  let user = "santhosh";

  return (
    <>
      <Header user={user} />
      <Footer user="Murugan" />
      <Content />
    </>
  );
}

export default App;
