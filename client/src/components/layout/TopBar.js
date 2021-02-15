import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";
import logo from "../../pictures/logo.jpg";

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li key="sign-in">
      <Link to="/user-sessions/new">Sign In</Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new" className="button">
        Sign Up
      </Link>
    </li>,
  ];

  const authenticatedListItems = [
    <li key="account">
      <Link to="/Profile">My Account</Link>
    </li>,
    <li key="sign-out">
      <SignOutButton />
    </li>,
  ];

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <ul className="menu">
          <li className="menu-text">
            <Link to="/">
              <img className="logo" src={logo}></img>
            </Link>
          </li>
        </ul>
      </div>
      <div className="top-bar-right">
        <ul className="menu">
          <li>
            <Link to="/browsing">Flight Browsing</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          {user ? authenticatedListItems : unauthenticatedListItems}
        </ul>
      </div>
    </div>
  );
};

export default TopBar;
