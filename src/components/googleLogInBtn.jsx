import React, { Component, useState } from "react";
import { GoogleLogin } from "react-google-login";
import firebase from "../firebaseConfig";
require("dotenv").config();

class Login extends Component {
  
  
  render() {
    const { signedInIsTrue } = this.props;
    function responseGoogle(googleUser) {
      var id_token = googleUser.getAuthResponse().id_token;
      var googleId = googleUser.getId();

      console.log({ googleId });
      console.log({ accessToken: id_token });
      let profile = googleUser.getBasicProfile();
      console.log(profile.getName());
      firebase
        .database()
        .ref("users/" + googleId)
        .set({
          username: profile.getName(),
          email: profile.getEmail(),     
        });
        signedInIsTrue();
        //exports.googleId = googleId; returns undefined
    }
    return (
      <div>
        <GoogleLogin
          render={renderProps => (
            <button onClick={renderProps.onClick} disabled={renderProps.disabled} class="bg-white hover:bg-gray-200 font-sans font-semibold text-black py-2 px-4 rounded w-56">Login</button>
          )}
          clientId= {process.env.REACT_APP_LOCAL_GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    );
  }
}

export default Login;




