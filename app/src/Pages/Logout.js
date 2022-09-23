import "../Styles/App.css";
import React from "react";

import { useNavigate } from "react-router-dom";
import { useEffect } from 'react'

function Logout() {
    const navigate = useNavigate();

    try {
        fetch(
          "http://localhost:3001/users/logout"
        )
          .then((res) => res.json())
          .then((result) => {
            if (result === false) console.log("Logout Failed!");
          });
          
      } catch (e) {
        console.log("Error logging out: ", e.message);
      }
      useEffect(()=>{
        localStorage.removeItem("idToken");
        localStorage.removeItem("userID");
        localStorage.removeItem("userEmail");
        navigate("/");
        //const [value, setValue] = React.useState(0);
        //this.setState();
        //needs to update state of navbar
        window.location.reload(false);
        
    }, [])

    
    
    
    return(
        null
    );
}

export default Logout;