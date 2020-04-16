import React, { Component } from "react";
import { GoogleLogout } from "react-google-login";


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
      <button onClick = {this.responseGoogle}>LOGOUT</button>
    );
  }
}

export default LogOut;
