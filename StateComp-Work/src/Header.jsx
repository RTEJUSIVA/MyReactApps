import React from "react";

const Header = () => {
  return (
    <>
      <div className="pad-10-all head-format">
        <h1>
          State Components With{" "}
          <span style={{ color: "#f00", textDecoration: "underline" }}>
            Usestate
          </span>{" "}
          function
        </h1>
      </div>
      <div className="content-inside">
        <div className="todo-text">ToDo List</div>
      </div>
    </>
  );
};

export default Header;
