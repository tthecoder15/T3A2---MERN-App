import React from "react"
import { Link } from "react-router-dom"
import sessionState from "../routes/store"
import './global.css'

const NavBar = () => {
    const isAuthenticated = sessionState((state) => state.isAuthenticated)
    const logout = sessionState((state) => state.logout)
    
    const logoutClick = () => {
        logout()
    }

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
                    </div>
                    <div>
                        <Link className="login" to="/user/login" >
                            {isAuthenticated ? 
                                <>
                                    <>My Account</> 
                                    <button onClick={logoutClick}>Logout</button>
                                </> 
                                : <>Login/Register</>}
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar