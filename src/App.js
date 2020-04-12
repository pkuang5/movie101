import React, { Component } from "react";
import "./App.css";
import "./styles/app.css";
import Background from "./components/background"
import firebase from "./firebaseConfig"
import searchMoviesByKeyword from "./assets/movieDbApi"

function writeUserData(userId, name, email) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email
  });
  console.log("data uploaded to database");
}

class App extends Component {
  render(){
    searchMoviesByKeyword()
    // writeUserData("1","Patrick Kuang","pkuang@ucsb.edu");
    return (
      <React.Fragment>
        <Background></Background>  
      </React.Fragment>
    ); 
  }
}

export default App;
