import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../context/AuthContext'
// import SearchContainer from './components/Search/SearchContainer'
import SearchContainer from "../components/Search/SearchContainer";

import Navbar from "../components/Navbar";


const HomePage = () => {
    let {authTokens, logoutUser} = useContext(AuthContext)

 

        // if(response.status === 200){
        //     setNotes(data)
        // }else if(response.statusText === 'Unauthorized'){
        //     logoutUser()
        // }
        
    

    return (
        <div>
            {/* <p>You are logged to the home page!</p> */}
            
            <Navbar/><SearchContainer/>

 
           
        </div>
    )
}

export default HomePage
