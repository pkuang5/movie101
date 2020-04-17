import React, { Component } from "react";
import "./App.css";
import "./styles/app.css";
import Login from "./components/login"
import LogOut from "./components/googleLogOutBtn"
import Feed from "./components/feed"
import Introduction from "./components/introduction"
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

function App() {
  return (
    <React.Fragment>
      <Login></Login> ,
      <Introduction></Introduction>
    </React.Fragment>
  ); 
}
export default App;
