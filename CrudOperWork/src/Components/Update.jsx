import React, { useEffect, useState } from "react";
import { API_URL } from "../Constants/URL";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Update = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [checked, setChecked] = useState(false);
  const [id, setID] = useState("");

  const navigatePage = useNavigate();

  const updateUser = async () => {
    await axios.put(API_URL + id, {
      firstname,
      lastname,
      checked,
    });
    navigatePage("/delete");
  };

  useEffect(() => {
    setID(localStorage.getItem("id"));
    setFirstname(localStorage.getItem("firstname"));
    setLastname(localStorage.getItem("lastname"));
    setChecked(localStorage.getItem("checked"));
  }, []);

  return (
    <>
      <div>
        <h1>Update a Task</h1>
      </div>
      <div>
        <label>Enter Firstname</label>
        <input
          type="text"
          placeholder="Enter Firstname"
          value={firstname}
          id=""
          onChange={(event) => setFirstname(event.target.value)}
        />
      </div>
      <div>
        <label>Enter Lastname</label>
        <input
          type="text"
          placeholder="Enter Lastname"
          value={lastname}
          id=""
          onChange={(event) => setLastname(event.target.value)}
        />
      </div>
      <div>
        <input
          type="checkbox"
          checked={checked}
          onChange={() => {
            setChecked(!checked);
          }}
        />
        <label>I Agree Terms and Conditions</label>
      </div>
      <div>
        <button type="button" onClick={updateUser}>
          Update
        </button>
      </div>
    </>
  );
};

export default Update;
