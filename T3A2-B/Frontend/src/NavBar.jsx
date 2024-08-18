import React from "react"
import { Link } from "react-router-dom"

const NavBar = () => {
    return (
        <>
            <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <Link className="navbar-item" to="/">
                        <h1>---Insert PAWFECT CARE Icon---</h1>
                    </Link>
                    <Link role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </Link>
                </div>
                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <Link className="navbar-item" to="/">Home</Link>
                        <Link className="navbar-item" to="/ourteam" >Our Team</Link>
                        <Link className="navbar-item" to="/booking" >Book Now</Link>
                        <Link className="navbar-item" to="/contact" >Contact Us</Link>
                    </div>
                    <div className="navbar-start">
                        <Link className="navbar-item" to="/user/login" >Login/Register</Link>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar