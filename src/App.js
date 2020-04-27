import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import "./App.css";
import "./styles/app.css";
import Login from "./components/login"
import Feed from "./components/feed"
import Editor from "./components/editor"
import Films from "./components/films"
import Settings from "./components/settings";
import Navbar from "./components/navbar"
import firebase from "firebase";


class App extends Component {
  state = {
    signedIn: false,
    googleId: '',
    profilePic: ''
  }

  navLinkStyle = {color:"black", textDecoration:"none", paddingRight: "0.3rem", paddingLeft: "0.3rem", paddingBottom: "0.1rem"};
  activeStyle = {borderBottom: "1px solid #a0aec0"};
  navbarTabStyle = "font-montserrat block inline-block mt-0 text-black cursor-pointer mr-4";

  signInState = (bool, id) => {
    this.setState({
      signedIn: bool,
      googleId: id,
    })
    //console.log(this.state.signedIn)
  }
  

  componentDidMount = () => {
    let localStorageObject = JSON.parse(localStorage.getItem('user'));
    if (localStorageObject && localStorageObject.signedIn === true) {
      this.setState({
        signedIn: true,
        googleId: localStorageObject.googleId
      })
    }
    
    var userInfo = firebase.database().ref('users/' + localStorage.getItem('id')); // had to change to local storage b/c
                                                                                  // id keeps going away upon refresh
    userInfo.on('value', (snapshot) => {
        this.setState({googleId: snapshot.val().id});
        this.setState({profilePic: snapshot.val().profileURL})
      })
     
  }
  componentWillUpdate = (nextProps, nextState) => {
    localStorage.setItem('user', JSON.stringify(nextState))
  }
  finalLogOut = () => {
    localStorage.clear();
  }

  render() {
    if (this.state.signedIn === false || localStorage.getItem('logKey') === false) {
      return (
        <Login signInState={this.signInState} />
      );
    }
    else {
      return (
        <Router>
          <Navbar signInState={this.signInState} />
          <Switch>
            <Route path="/" exact strict component={() => <Feed signInState={this.signInState} googleId={this.state.googleId} />}></Route>
            <Route path="/editor" exact strict component={Editor}></Route>
            <Route path="/films" exact strict component={Films}></Route>
            <Route path="/profile" exact strict component={Settings}></Route>
          </Switch>
        </Router>
      );
    }
  }
}
export default App;
