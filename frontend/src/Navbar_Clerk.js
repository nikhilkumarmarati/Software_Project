import React from 'react'
import {Link } from 'react-router-dom'

const Navbar_Clerk=() =>{
    return ( 
        <nav className="navbar">
            <h1>Public Works Department</h1>
            <div className="links">
                <Link to="/Clerk_Home" className="link">Home</Link>
                <Link to="/Logout" className="link">Log out</Link>
            </div>
        </nav>
     );
}

export default Navbar_Clerk