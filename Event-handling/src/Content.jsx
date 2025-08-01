import React from "react";
let user = "kumar";

function clickSomething(e) {
  console.log(e.target.innerText);
  // console.log("Hello U clicked!!");
  user = "Santhosh";
  console.log(user);
}

function clickSomething1(event) {
  console.log(event.target.innerText);
  //console.log("Hello U clicked other!!");
  user = "Siva";
  console.log(user);
}

//let [count, setCount] = useState(0);

const Content = () => {
  return (
    <div>
      <h1> User changed</h1>

      <h1>Counter Application - {user}</h1>
      <button className="btn-click" onClick={clickSomething}>
        Click me!!
      </button>
      <button
        className="btn-click"
        onClick={(e) => {
          clickSomething1(e);
        }}
      >
        Duplicate Click me!!
      </button>
    </div>
  );
};

export default Content;
