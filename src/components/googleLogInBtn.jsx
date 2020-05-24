import React, { Component} from "react";
import { GoogleLogin } from "react-google-login";
import firebase from "../firebaseConfig";

require("dotenv").config();

class GoogleLogInBtn extends Component {

  responseGoogle = (googleUser) => {
   
    var googleId = googleUser.getId();
   
    let profile = googleUser.getBasicProfile();
    var username = profile.getEmail().split('@')[0];
    firebase.database().ref(`users/${googleId}`).once("value", snapshot => {
      if (!snapshot.exists()){
        firebase
        .database()
        .ref("users/" + googleId)
        .set({
          fullName: profile.getName(),
          firstName: profile.getGivenName(),
          lastName: profile.getFamilyName(),
          email: profile.getEmail(),     
          profileURL: googleUser.profileObj.imageUrl,
          id: googleUser.getId(),
          userName: username,
          bio: ''

        });
      }
      else {
        username = snapshot.val().userName
      }
      this.props.signInState(true, googleId, username);
    });
      
  }
  
  render() {
    return (
      <div>
        <GoogleLogin
          render={renderProps => (
            <button onClick={renderProps.onClick} disabled={renderProps.disabled} class="bg-white hover:bg-gray-200 font-sans font-semibold text-black py-2 px-4 rounded w-56">Login</button>
          )}
          clientId= {process.env.REACT_APP_LOCAL_GOOGLE_CLIENT_ID }
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
