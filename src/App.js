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

class App extends Component {
  state = {
    signedIn: false,
    googleId: '',
  }

  navLinkStyle = {color:"black", textDecoration:"none", paddingRight: "0.3rem", paddingLeft: "0.3rem", paddingBottom: "0.1rem"};
  activeStyle = {borderBottom: "1px solid #a0aec0"};
  navbarTabStyle = "font-montserrat block inline-block mt-0 text-black cursor-pointer mr-4";

  signInState = (bool, id) => {
    this.setState({
      signedIn: bool,
      googleId: id,
    })
    localStorage.setItem('id', this.state.googleId)
  }

  componentDidMount = () => {
    let localStorageObject = JSON.parse(localStorage.getItem('user'));
    if (localStorageObject && localStorageObject.signedIn === true) {
      this.setState({
        signedIn: true,
        googleId: localStorageObject.googleId
      })
    }
     
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
          <Navbar signInState={this.signInState} />
          <Switch>
            <Route path="/" exact strict component={() => <Feed signInState={this.signInState} googleId={this.state.googleId} />}></Route>
            <Route path="/editor" exact strict component={Editor}></Route>
            <Route path="/films" exact strict component={Films}></Route>
            <Route path="/profile" exact strict component={() => <Settings signInState={this.signInState} googleId={this.state.googleId} />}></Route>
          </Switch>
        </Router>
      );
    }
  }
}
export default App;
