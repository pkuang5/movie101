import React, { Component } from "react";
import { GoogleLogout } from "react-google-login";
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom'
import Login from "./googleLogInBtn.jsx"



class LogOut extends Component {

  responseGoogle = (googleUser) => {
    
    console.log("WORKING");
   
    this.props.signOffIsTrue();
    
  }
  
  render() {

    
    return (
      // <GoogleLogout
      //   clientId={process.env.REACT_APP_LOCAL_GOOGLE_CLIENT_ID}
      //   buttonText="Logout"
      //   onLogoutSuccess={this.responseGoogle}
        
      // ></GoogleLogout>
      
      // added routing to login page upon log out
      
      <Link to = "/">
      <button onClick = {this.responseGoogle}>LOGOUT</button>
      </Link>
      
      

      
    );
  }
}

export default LogOut;
