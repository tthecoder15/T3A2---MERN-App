import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import sessionState from "../routes/store";
import './global.css';

const NavBar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const isAuthenticated = sessionState((state) => state.isAuthenticated);
  const logout = sessionState((state) => state.logout);
  const navigate = useNavigate();

  const logoutClick = () => {
    logout();
    navigate("/user/login");
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav>
        <div className="hamburger" onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="navLogo">
          <Link to="/">
            <img
              src="../docs/logo-and-art/PC-logo-ellipsis.png"
              alt="Navbar Logo"
            />
          </Link>
        </div>
        <div className={`site-nav ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" onClick={toggleMenu}>Home</Link>
          <p>|</p>
          <Link to="/ourteam" onClick={toggleMenu}>Our Team</Link>
          <p>|</p>
          <Link to="/booking" onClick={toggleMenu}>Book Now</Link>
          <p>|</p>
          <Link to="/contact" onClick={toggleMenu}>Contact Us</Link>
        </div>
        <div className={`login ${isMenuOpen ? 'active' : ''}`}>
          {isAuthenticated ? (
            <>
              <Link id="logged-in" to="/user/login" onClick={toggleMenu}>My Account</Link>
              <button id="logged-in" onClick={() => { logoutClick(); toggleMenu(); }}>Logout</button>
            </>
          ) : (
            <Link id="logged-in" to="/user/login" onClick={toggleMenu}>Login/Register</Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default NavBar;