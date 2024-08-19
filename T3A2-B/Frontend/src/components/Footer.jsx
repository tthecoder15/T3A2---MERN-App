import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
        <>
            <footer className="footer">
                <div className="content has-text-centered">
                    <p>
                        Contact info
                        Address: 1 First St Melbourne
                        Email: Pawfect@care.com
                        Phone: 0412 345 678
                        After Hours Emergency:
                        0423 456 789
                    </p>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/ourteam">Our Team</Link></li>
                    <li><Link to="/booking">Book Now</Link></li>
                    <li><Link to="/contact">Contact Us</Link></li>
                    <p>
                        Opening Hours:
                        Weekdays: 9am - 5pm
                        Weekends: Closed
                    </p>
                    <Link to="/">LOGO</Link>
                    <p>
                        © Copyright Pawfect Care 2024
                    </p>
                </div>
            </footer>
        </>
    )
}

export default Footer