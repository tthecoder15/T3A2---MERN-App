import React from "react"
import { Link } from "react-router-dom"
import sessionState from "../routes/store"
import './global.css'

const NavBar = () => {
  const isAuthenticated = sessionState((state) => state.isAuthenticated);
  const logout = sessionState((state) => state.logout);

  const logoutClick = () => {
    logout();
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
            <Link id="logged-in" to="/user/login">
              {isAuthenticated ? (
                <>
                  <>My Account</>
                  <button id="logged-in" onClick={logoutClick}>Logout</button>
                </>
              ) : (
                <>Login/Register</>
              )}
            </Link>
          </div>
      </nav>
    </>
  );
};

export default NavBar;
