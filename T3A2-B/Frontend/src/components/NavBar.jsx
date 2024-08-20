import React from "react"
import { Link } from "react-router-dom"

const NavBar = () => {
    return (
        <>
            <nav>
                <div>
                    <Link className="navLogo" to="/">
                        <img
                            src="../docs/logo-and-art/PC-logo-ellipsis.png"
                            alt="Navbar Logo"
                        />
                    </Link>
                </div>
                <div>
                    <div>
                        <Link to="/">Home</Link>
                        <Link to="/ourteam" >Our Team</Link>
                        <Link to="/booking" >Book Now</Link>
                        <Link to="/contact" >Contact Us</Link>
                        <Link to="/user/myaccount" >TEMP BUTTON TO ACCOUNT</Link>
                    </div>
                    <div>
                        <Link className="login" to="/user/login" >Login/Register</Link>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar