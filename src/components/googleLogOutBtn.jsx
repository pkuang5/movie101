import React, { Component } from "react";
import { GoogleLogout } from "react-google-login";
class LogOut extends Component {
  render() {
    return (
      <GoogleLogout
        clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
        buttonText="Logout"
        onLogoutSuccess={logout}
      ></GoogleLogout>
    );
  }
}

export default LogOut;
