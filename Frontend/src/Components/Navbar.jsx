import React from "react";
import Logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import "./Navbar.css"

export default function Navbar() {
  return (
    <div className="navbar-container">
      <div className="navbar-left">
        <img src={Logo} alt="OLEX Logo" className="logo" />
      </div>
      <div className="navbar-right">
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/Hero" className="navbar-link">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/About" className="navbar-link">About</Link>
          </li>
          <li className="navbar-item">
            <Link to="/ProductsView" className="navbar-link">Product</Link>
          </li>
          <li className="navbar-item">
            <Link to="/Contact" className="navbar-link">Contact</Link>
          </li>
          <li className="navbar-item">
            <Link to="/Gallery" className="navbar-link">Who we are</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-login">
        <h1 className="loginButton">
          <Link to="/" className="login-link">Login</Link>
        </h1>
      </div>
    </div>                              
  );
}
