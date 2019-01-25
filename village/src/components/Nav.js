import React from "react";
import { NavLink } from "react-router-dom";

const Nav = props => {
  return (
    <nav className="nav">
      <h1>Smurf Village</h1>
      <div className="navlinks">
        <NavLink to="/">Smurfs</NavLink>
        <NavLink to="/smurf-form">
          {props.isUpdating ? "Update Smurf" : "Add Smurf"}
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav;
