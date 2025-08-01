import React from "react";
import { useState } from "react";

const Content = () => {
  let [count, setCount] = useState(0);

  function returnState() {
    console.log(100);

    return 100;
  }

  let [sample, setSample] = useState(() => {
    return returnState();
  });

  //console.log(useState(0));

  function handleInc() {
    setCount((prevCount) => prevCount + 1);
    setCount((prevCount) => prevCount + 1);
    setCount((prevCount) => prevCount + 1);
  }

  function handleDec() {
    setCount(count - 1);
  }

  let message;
  let remainingClick = 10 - count;

  if (count < 10) {
    message = (
      <div>
        <p>You clicked {count} times </p>
        <p>Still {remainingClick} more times to reach 10% discount </p>
      </div>
    );
  } else if (count === 10) {
    message = (
      <div>
        <p>You clicked {count} times </p>
        <p>You unlocked the 10% discount </p>
      </div>
    );
  }
  return (
    <>
      <div className="content-inner d-flex">
        <div className="w-100 d-flex">
          <h1>
            Main Content - {count}- {sample}
          </h1>
        </div>
        <div className="w-100">
          <button className="btn-click-1" onClick={handleInc}>
            Increment
          </button>
          <button className="btn-click-2 mar-left-10" onClick={handleDec}>
            Decrement
          </button>
          {/* {count >= 10 ? (
            <p>You unlocked the 10% discount</p>
          ) : (
            <p>Click 10 times to unlock rewards</p>
          )} */}

          {count >= 20 && <p>You are the click master!!</p>}

          {message}
        </div>
      </div>
    </>
  );
};

export default Content;
