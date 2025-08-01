import React, { useState } from "react";
import styled from "styled-components";

let Button = styled.button`
  background-color: blue;
  color: white;
  width: 100px;
  height: 50px;
`;

let NewButton = styled(Button)`
  box-shadow: 5px 5px 4px black;
`;

const SampleCond = () => {
  let [data, setData] = useState(0);

  function sampleClick() {
    setData(data + 1);
  }

  return (
    <div>
      <NewButton className="Button" onClick={sampleClick}>
        Click me!!
      </NewButton>

      <h1>{data}</h1>
      {data >= 10 || data >= 20 ? (
        <p>You clicked 10 times</p>
      ) : (
        <p>You are not clicked!!</p>
      )}
    </div>
  );
};

export default SampleCond;
