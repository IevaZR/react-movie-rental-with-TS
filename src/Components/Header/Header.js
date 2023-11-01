import React from "react";
import "./Header.css"
import Navbar from "../Navbar/Navbar";

const Header = () => {
  return (
    <div className="HeaderWrapper">
      <h1 className="PageHeading">Movie Rental</h1>
      <Navbar />
    </div>
  );
};

export default Header;
