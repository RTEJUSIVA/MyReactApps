import React, { useEffect, useState } from "react";
import "../advice.css";

const AdviceApp = () => {
  const [advice, setAdvice] = useState("");
  async function getAdvice() {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    setAdvice(data.slip.advice);
  }
  useEffect(() => {
    getAdvice();
  }, []);

  return (
    <>
      <div className="align-text">
        <h3>AdviceApp</h3>
        <p>{advice}</p>
        <button onClick={getAdvice}>Get Advice</button>
      </div>
    </>
  );
};

export default AdviceApp;
