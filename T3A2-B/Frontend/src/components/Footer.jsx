import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
        <>
            <footer className="footer">
                <div className="content has-text-centered">
                    <p>© Copyright Pawfect Care 2024</p>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/ourteam">Our Team</Link></li>
                    <li><Link to="/booking">Book Now</Link></li>
                    <li><Link to="/contact">Contact Us</Link></li>
                    <p>Contact info</p>
                    <p>Address: 1 First St Melbourne</p>
                    <p>Email: Pawfect@care.com</p>
                    <p>Phone: 0412 345 678</p>
                    <p>After Hours Emergency: </p>
                    <p>0423 456 789</p>
                </div>
            </footer>
        </>
    )
}

export default Footer