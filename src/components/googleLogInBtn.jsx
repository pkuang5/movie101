import React, { Component} from "react";
import { GoogleLogin } from "react-google-login";
import firebase from "../firebaseConfig";
require("dotenv").config();

class GoogleLogInBtn extends Component {

  responseGoogle = (googleUser) => {
    var id_token = googleUser.getAuthResponse().id_token;
    var googleId = googleUser.getId();

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
      
      this.props.signInState(true, googleId);
      console.log(googleUser.profileObj.imageUrl)
      this.props.setProfilePic(googleUser.profileObj.imageUrl);
      localStorage.setItem('id', googleId)
      localStorage.setItem('url', googleUser.profileObj.imageUrl)
      localStorage.setItem('logKey', true)
      
  }
  
  render() {
    return (
      <div>
        <GoogleLogin
          render={renderProps => (
            <button onClick={renderProps.onClick} disabled={renderProps.disabled} class="bg-white hover:bg-gray-200 font-sans font-semibold text-black py-2 px-4 rounded w-56">Login</button>
          )}
         // clientId = {process.env.REACT_APP_FIREBASE_GOOGLE_CLIENT_ID}
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
