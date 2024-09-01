import React from "react";
import { Link } from "react-router-dom";
import "./global.css";

const Footer = () => {
  return (
    <>
      <footer>
        <div id="contact-footer">
          <p>
            Contact info:
            <br />
            Address: 1 First St Melbourne
            <br />
            Email: Pawfect@care.com
            <br />
            Phone: 0412 345 678
            <br />
            After Hours Emergency:
            <br />
            0423 456 789
          </p>
        </div>
        <div id="links-footer">
          <p>
            Website Links:
            <br />
            <Link to="/">Home</Link>
            <br />
            <Link to="/ourteam">Our Team</Link>
            <br />
            <Link to="/booking">Book Now</Link>
            <br />
            <Link to="/contact">Contact Us</Link>
          </p>
        </div>
        <div id="times-footer">
          <p>
            Opening Hours:
            <br />
            Weekdays: 9am - 5pm
            <br />
            Weekends: Closed
          </p>
        </div>
        <Link to="/">
          <img
            src="/docs/logo-and-art/PC-logo-square-notext.png"
            alt="Square logo"
          />
        </Link>
        <div className="copyright">
          <p>© Copyright Pawfect Care 2024</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
