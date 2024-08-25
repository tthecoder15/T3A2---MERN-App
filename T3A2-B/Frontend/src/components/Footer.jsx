import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
        <>
            <footer>
                <div>
                    <div>
                        <h5>Contact info</h5>
                        <p>
                        Address: 1 First St Melbourne
                        Email: Pawfect@care.com
                        Phone: 0412 345 678
                        After Hours Emergency:
                        0423 456 789
                        </p>
                    </div>
                    <div>
                        <h5>Website Links</h5>
                        <p>
                        <Link to="/">Home</Link>
                        <Link to="/ourteam">Our Team</Link>
                        <Link to="/booking">Book Now</Link>
                        <Link to="/contact">Contact Us</Link>
                        </p>
                    </div>
                    <div>
                    <h5>Opening Hours:</h5>
                    <p>
                        Weekdays: 9am - 5pm
                        Weekends: Closed
                    </p>
                    </div>
                    <Link to="/">
                        <img
                            src="../docs/logo-and-art/PC-logo-square-text.png"
                            alt="First slide"
                        />
                        </Link>
                    <div>
                    <p>
                        © Copyright Pawfect Care 2024
                    </p>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer