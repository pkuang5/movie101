import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";

class Login extends Component {
  render() {
    const { func } = this.props;
    function responseGoogle(googleUser) {
      var id_token = googleUser.getAuthResponse().id_token;
      var googleId = googleUser.getId();

      console.log({ googleId });
      console.log({ accessToken: id_token });

      func();
    }
    return (
      <div>
        <GoogleLogin
          render={renderProps => (
            <button onClick={renderProps.onClick} disabled={renderProps.disabled} class="bg-white font-sans font-semibold text-black py-2 px-4 rounded w-56">Login</button>
          )}
          clientId="1002495861102-pi46kessn4v06m00i1gjsvpdilkqhf55.apps.googleusercontent.com"
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
