import React, { Component } from "react";
import "./App.css";
import "./styles/app.css";
import Login from "./components/login"
import Introduction from "./components/introduction"

function App() {
  return (
    <React.Fragment>
      <Login></Login>  
      <Introduction></Introduction>
    </React.Fragment>
  ); 
}

export default App;
