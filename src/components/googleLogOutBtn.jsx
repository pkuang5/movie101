import React, { Component } from "react";
import { GoogleLogout } from "react-google-login";
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom'
import Login from "./googleLogInBtn.jsx"



class LogOut extends Component {

  handleLogout = () => {
    this.props.signInState(false,'')
  }

  render() {
    return (      
      <button onClick = {this.handleLogout}>LOGOUT</button>
    );
  }
}

export default LogOut;
