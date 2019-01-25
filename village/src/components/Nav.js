import React from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="nav">
      <NavLink to="/">Smurfs</NavLink>
      <NavLink to="/smurf-form">Smurf Form</NavLink>
    </nav>
  );
};

export default Nav;
