import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import firebase from './firebaseConfig'
import "./App.css";
import "./styles/app.css";
import Login from "./components/login"
import Feed from "./components/feed"
import Editor from "./components/editor"
import Films from "./components/films"
import Settings from "./components/settings"
import Profile from "./components/profile"
import Navbar from "./components/navbar"

class App extends Component {
  state = {
    signedIn: false,
    googleId: '',
    username: ''
  }

  signInState = (bool, id) => {
    this.setState({
      signedIn: bool,
      googleId: id,
    })
    var userInfo = firebase.database().ref('users/' + id)
    userInfo.on('value', (snapshot) => {
      if (snapshot.val()) this.setState({username: snapshot.val().userName})
    })
  }

  componentDidMount = () => {
    let localStorageObject = JSON.parse(localStorage.getItem('user'));
    if (localStorageObject && localStorageObject.signedIn === true) {
      this.setState({
        signedIn: true,
        googleId: localStorageObject.googleId
      })
    }

    var userInfo = firebase.database().ref('users/' + localStorageObject.googleId)
    userInfo.on('value', (snapshot) => {
      if (snapshot.val()) this.setState({username: snapshot.val().userName})
    })
  }

  componentWillUpdate = (nextProps, nextState) => {
    localStorage.setItem('user', JSON.stringify(nextState))
  }

  render() {
    if (this.state.signedIn === false) {
      return (
        <Login signInState={this.signInState} />
      );
    }
    else {
      return (
        <Router>
          <Navbar signInState={this.signInState} username={this.state.username} />
          <Switch>
            <Route path="/" exact strict component={() => <Feed signInState={this.signInState} googleId={this.state.googleId} />}></Route>
            <Route path="/editor" exact strict component={Editor}></Route>
            <Route path="/films" exact strict component={Films}></Route>
            <Route path={"/" + this.state.username} exact strict component={Profile}></Route>
            <Route path="/settings" exact strict component={() => <Settings signInState={this.signInState} googleId={this.state.googleId} />}></Route>
          </Switch>
        </Router>
      );
    }
  }
}
export default App;
