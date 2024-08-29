import React from "react"
import { Link, useNavigate } from "react-router-dom"
import sessionState from "../routes/store"
import './global.css'

const NavBar = () => {
  const isAuthenticated = sessionState((state) => state.isAuthenticated);
  const logout = sessionState((state) => state.logout);
  const navigate = useNavigate();

  const logoutClick = () => {
    logout();
    navigate("/user/login")
  };

  return (
    <>
      <nav>
        <div className="navLogo">
          <Link to="/">
            <img
              src="../docs/logo-and-art/PC-logo-ellipsis.png"
              alt="Navbar Logo"
            />
          </Link>
        </div>
          <div className="site-nav">
            <Link to="/">Home</Link>
            <p>|</p>
            <Link to="/ourteam">Our Team</Link>
            <p>|</p>
            <Link to="/booking">Book Now</Link>
            <p>|</p>
            <Link to="/contact">Contact Us</Link>
          </div>
          <div className="login"> 
              {isAuthenticated ? (
                <>
                  <Link id="logged-in" to="/user/login"><>My Account</></Link>
                  <button id="logged-in" onClick={logoutClick}>Logout</button>
                </>
              ) : (
                  <Link id="logged-in" to="/user/login">Login/Register</Link>
              )}
          </div>
      </nav>
    </>
  );
};

export default NavBar;
