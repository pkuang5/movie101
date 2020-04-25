import React, { Component} from "react";
import { GoogleLogin } from "react-google-login";
import firebase from "../firebaseConfig";

require("dotenv").config();

class GoogleLogInBtn extends Component {

  responseGoogle = (googleUser) => {
    var id_token = googleUser.getAuthResponse().id_token;
    var googleId = googleUser.getId();

    let profile = googleUser.getBasicProfile();
    var stringPart = profile.getEmail().split('@');
    firebase
      .database()
      .ref("users/" + googleId)
      .update({
        fullName: profile.getName(),
        firstName: profile.getGivenName(),
        lastName: profile.getFamilyName(),
        email: profile.getEmail(),     
        profileURL: googleUser.profileObj.imageUrl,
        id: googleUser.getId(),

        //userName:  stringPart[0],
        
        //bio: '',


      });
      
      this.props.signInState(true, googleId);
      this.props.setProfilePic(googleUser.profileObj.imageUrl);
      localStorage.setItem('id', googleId)
     
      
      
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
