import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'

const LoginPage = () => {
    let {loginUser} = useContext(AuthContext)
    return (
        <div className="contain">
            <div className="forms1">
            <h1 style={{padding:'8px',margin:'5px'}}>WELCOME TO BIT FACULTY DASHBOARD</h1>

            <form onSubmit={loginUser}>
                <label htmlFor="true" name="username">ENTER A VALID EMAILID :</label>
                <input type="text" name="username" placeholder="Enter email id" /><br/><br/><br/>
                <label htmlFor="true" name="password">ENTER A VALID PASSWORD :</label>

                <input type="password" name="password" placeholder="Enter Password" /><br/><br/>
                <input  className="nith" type="submit"/>
            </form>
            </div>
        </div>
    )
}

export default LoginPage
