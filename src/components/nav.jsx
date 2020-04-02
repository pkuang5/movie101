import React, { Component } from "react";
import Login from "./googleLogInBtn";
class NavBar extends Component {
  clicked = () => {
    console.log("the button was clicked!");
  };
  render() {
    return (
      <nav class="navbar navbar-light bg-light static-top">
        <div class="container">
          <a class="navbar-brand" href="#">
            Movie 101
          </a>
          <Login />
        </div>
      </nav>
    );
  }
}

export default NavBar;
