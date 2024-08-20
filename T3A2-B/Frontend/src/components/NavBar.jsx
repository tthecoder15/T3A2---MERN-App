import React from "react"
import { Link } from "react-router-dom"

const NavBar = () => {
    return (
        <>
            <nav>
                <div>
                    <Link to="/">
                        <h1>---Insert PAWFECT CARE Icon---</h1>
                    </Link>
                </div>
                <div>
                    <div>
                        <Link to="/">Home</Link>
                        <Link to="/ourteam" >Our Team</Link>
                        <Link to="/booking" >Book Now</Link>
                        <Link to="/contact" >Contact Us</Link>
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