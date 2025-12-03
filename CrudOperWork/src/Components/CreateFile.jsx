import React, { useState } from "react";
import { API_URL } from "../Constants/URL";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateFile = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [checked, setChecked] = useState(false);

  const navigatePage = useNavigate();

  const postData = async () => {
    await axios.post(API_URL, {
      firstname,
      lastname,
      checked,
    });
    navigatePage("/read");
  };

  return (
    <>
      <div>
        <h1>Create a Task</h1>
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
        <button type="button" onClick={postData}>
          Submit
        </button>
      </div>
    </>
  );
};

export default CreateFile;
