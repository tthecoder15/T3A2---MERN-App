import React from 'react'
import { Link } from 'react-router-dom'
import './global.css'

const Footer = () => {
  return (
    <>
      <footer>
        <div id="contact-footer">
          <h3>Contact info</h3>
          <p>
            Address: 1 First St Melbourne<br />
            Email: Pawfect@care.com<br />
            Phone: 0412 345 678<br />
            After Hours Emergency:<br />
            0423 456 789
          </p>
        </div>
        <div id="links-footer">
          <h3>Website Links</h3>
          <p>
            <Link to="/">Home</Link><br />
            <Link to="/ourteam">Our Team</Link><br />
            <Link to="/booking">Book Now</Link><br />
            <Link to="/contact">Contact Us</Link>
          </p>
        </div>
        <div id="times-footer">
          <h3>Opening Hours:</h3>
          <p>
            Weekdays: 9am - 5pm<br />
            Weekends: Closed
          </p>
        </div>
        <Link to="/">
          <img
            src="../../docs/logo-and-art/PC-logo-square-text.png"
            alt="Square logo"
          />
        </Link>
        <div className="copyright">
          <p>
            © Copyright Pawfect Care 2024
          </p>
        </div>
      </footer>
    </>
  )
}

export default Footer
