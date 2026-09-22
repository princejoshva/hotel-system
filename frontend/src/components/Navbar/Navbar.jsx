import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">

        <Link to="/" className="navbar-logo">
         OpalHaven  
         {/* is a premier short-term rental provider */}
        </Link>

        <div className="navbar-links">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/add-hotel"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Add Hotel
          </NavLink>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
