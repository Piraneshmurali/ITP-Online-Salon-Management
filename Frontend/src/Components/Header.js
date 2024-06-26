import React from "react";
import "./header.css";
import { IoSearch } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import logo from "./images/logo.png";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const logoutclick = () => {
    navigate("/LoginPage");
  };

  return (
    <div className="header">
      <div className="header-logo">
        <img src={logo} className="logo-image" />
      </div>
      <div className="header-searchbar">
        {/* <div className="searchBar">
          <input type="text" placeholder="Search" className="search-input" />
          <button className="search-button">
            <IoSearch className="search-icon" />
          </button>
        </div> */}
        <h2>Hello Niron &#128526;, Have A Great Day!!! </h2>
      </div>
      <div className="header-left">
        <div className="header-logout">
          <button onClick={logoutclick} className="logout-button">
            Logout
          </button>
        </div>
        <div className="header-profile">
          <FaCircleUser size={40} className="profile-icon" />
        </div>
      </div>
    </div>
  );
}
