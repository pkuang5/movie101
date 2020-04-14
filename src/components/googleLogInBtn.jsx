import React, { Component} from "react";
import { GoogleLogin } from "react-google-login";
import firebase from "../firebaseConfig";
require("dotenv").config();

class GoogleLogInBtn extends Component {

  responseGoogle = (googleUser) => {
    var id_token = googleUser.getAuthResponse().id_token;
    var googleId = googleUser.getId();
    global.id = googleId;

    console.log({ googleId });
    console.log({ accessToken: id_token });
    let profile = googleUser.getBasicProfile();
    firebase
      .database()
      .ref("users/" + googleId)
      .set({
        fullName: profile.getName(),
        firstName: profile.getGivenName(),
        lastName: profile.getFamilyName(),
        email: profile.getEmail(),     
      });
      this.props.signedInIsTrue();
  }
  
  render() {
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

export default GoogleLogInBtn;
