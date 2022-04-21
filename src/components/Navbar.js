import React,{useContext} from "react";
import { Link } from "react-router-dom";
// import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

export default function Navbar() {
  let {user, logoutUser} = useContext(AuthContext)
    
  // console
  return (
    <div className="navbar">
      <img
        src="https://www.bitsathy.ac.in/assets/images/logo.png"
        alt="logo"
        className="navbar-logo"
      />
      {/* <h1 className="navbar-title">Faculty Dashboard</h1> */}
      <ul className="navbar-nav">

        <li className="navbar-nav-active">
          <Link to="/">Dashboard</Link>
        </li>
        <li>
        {user ? (
                 <p  onClick={logoutUser}>Logout</p>
            ): (
                <Link to="/login" >Login</Link>
            )}
        </li>
      </ul>
      
             

           

           
        
    </div>
  );
}
