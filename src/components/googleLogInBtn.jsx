import React, { Component, useState } from "react";
import { GoogleLogin } from "react-google-login";
import firebase from "../firebaseConfig";
require("dotenv").config();

class Login extends Component {
  state = {
    id: ""
  }

  responseGoogle = (googleUser) => {
    var id_token = googleUser.getAuthResponse().id_token;
    var googleId = googleUser.getId();
    this.setState({ id: googleId})

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
      this.props.signedInIsTrue();
      console.log(this.state.id)
  }
  
  render() {
    // const { signedInIsTrue } = this.props;
    return (
      <div>
        <GoogleLogin
          render={renderProps => (
            <button onClick={renderProps.onClick} disabled={renderProps.disabled} class="bg-white hover:bg-gray-200 font-sans font-semibold text-black py-2 px-4 rounded w-56">Login</button>
          )}
          clientId= {process.env.REACT_APP_LOCAL_GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    );
  }
}

export default Login;