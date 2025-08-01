import React, { useContext } from "react";
import { UserContext } from "../App";

const Footer = () => {
  let { user } = useContext(UserContext);
  let date = new Date();
  return (
    <main>
      <h2>Footer</h2>
      <UserContext.Consumer>
        {({ user }) => {
          return (
            <h1>
              {user.uName} - {date.getFullYear()}
            </h1>
          );
        }}
      </UserContext.Consumer>
    </main>
  );
};

export default Footer;
