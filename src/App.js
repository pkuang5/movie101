import React from "react";
import "./App.css";
import "./styles/app.css";
import Navbar from "./components/navbar"
import Background from "./components/background"

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Background />
    </React.Fragment>
  ); 
}

export default App;
