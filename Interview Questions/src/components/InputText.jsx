import React, { useState } from "react";

const InputText = () => {
  const [inputvalue, setInputValue] = useState("");
  const [displaytext, setDisplayText] = useState("");

  let handleChange = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <>
      <h1>You Typed Text</h1>
      <input
        type="text"
        placeholder="Type Some Text"
        value={inputvalue}
        onChange={handleChange}
      />
      <button
        type="button"
        onClick={() => {
          setDisplayText(inputvalue);
        }}
      >
        Show text
      </button>
      <h3>{displaytext && `You typed : ${displaytext}`}</h3>
    </>
  );
};

export default InputText;
