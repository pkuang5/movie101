import React, { Component } from "react";
import "./App.css";
import "./styles/app.css";
import Login from "./components/login"
import LogOut from "./components/googleLogOutBtn"
import Feed from "./components/feed"

function App() {
  return (
    <React.Fragment>
      <Login></Login>  
    </React.Fragment>
  ); 
}

export default App;
