import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Header = () => {
    let {user, logoutUser} = useContext(AuthContext)
    return (
        <div>
            <Link to="/dashboard" >Home</Link>
            <span> | 
            {user ? (
                 <p  onClick={logoutUser}>Logout</p>
            ): (
                <Link to="/login" >Login</Link>
            )}</span>
           
            
           
        </div>
    )
}

export default Header
