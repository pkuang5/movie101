import React, { Component } from "react";
import "./App.css";
import "./styles/app.css";
import Background from "./components/background"
import firebase from "./firebaseConfig"
import Profile from "./components/profilePage"
import Nav from "./components/navbar";
function writeUserData(userId, name, email) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email
  });
  console.log("data uploaded to database");
}
class App extends Component {
  render(){
    return ( 
      <React.Fragment>
        <Nav></Nav>  
      </React.Fragment> 
    ); 
  }
}

export default App;
