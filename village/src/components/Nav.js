import React from "react";
import { NavLink } from "react-router-dom";

const Nav = props => {
  return (
    <nav className="nav">
      <NavLink to="/">Smurfs</NavLink>
      <NavLink to="/smurf-form">
        {props.isUpdating ? "Update Smurf" : "Add Smurf"}
      </NavLink>
    </nav>
  );
};

export default Nav;
