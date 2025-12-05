import { BrowserRouter, Link, Route, Router, Routes } from "react-router-dom";
import Registration from "../src/Components/Registration";
import "./App.css";
import Userlist from "./Components/Userlist";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="flex">
          <ul>
            <li>
              <Link to="/">Registration</Link>
            </li>
            <li>
              <Link to="/">UserList</Link>
            </li>
          </ul>
        </div>
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/userslist" element={<Userlist />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
