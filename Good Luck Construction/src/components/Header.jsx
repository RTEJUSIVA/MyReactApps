import React from "react";
import { Link } from "react-router-dom";
import { BiPhoneCall } from "react-icons/bi";

const Header = () => {
  return (
    <>
      <header className="flex justify-center items-center flex-col">
        <div className="flex flex-row justify-between w-full bg-main-color p-3">
          <div className="text-white items-center">
            Plot No.48, Padmavathy Nagar, Bharathidasan Street, Guduvanchery -
            603202
          </div>
          <div className="text-white items-center flex flex-row">
            <span className="flex me-2">
              <BiPhoneCall className="text-white" />
            </span>{" "}
            <span className="flex"> 99405 00136 / 90955 93136</span>
          </div>
        </div>
        <div className="flex flex-col justify-center w-full items-center">
          <div className="flex p-3">
            <div className="flex w-full items-center justify-center">
              <img src="src/assets/logo.png" alt="logo" className="w-12 me-3" />
              <span className="poppins-extrabold uppercase text-yellow-300 text-2xl">
                <span className="text-blue-950 poppins-extrabold">
                  Good Luck
                </span>{" "}
                <span className="text-color poppins-extrabold">
                  Construction
                </span>
              </span>
            </div>
          </div>
          <div className="flex menu p-3 w-full justify-start items-start bg-gray-100">
            <ul className="flex w-full text-white gap-1 justify-start p-0 mx-0 my-0">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/services">Our Services</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
