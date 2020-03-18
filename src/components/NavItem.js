import React from "react";
import { NavLink } from "react-router-dom";

const NavItem = ({ name, to }) => {
  return (
    <li className="nav-item">
      <NavLink
        exact={true}
        className="nav-link font-weight-bold"
        to={to}
        activeClassName="custom-active"
      >
        {name}
      </NavLink>
    </li>
  );
};

export default NavItem;
