import React, { Component } from "react";
import "./App.css";
import "./styles/app.css";
import Login from "./components/login"
import LogOut from "./components/googleLogOutBtn"
import Feed from "./components/feed"
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Profile from "./components/profilePage";

class App extends Component {
  state = {
    signedIn: false,
    googleId: ''
  }
  
  signInState = (bool,id) => {
    this.setState({
      signedIn: bool,
      googleId: id,
    })
  }

  componentDidMount = () => {
      if (localStorage.getItem('user')) {
          this.setState ({
              signedIn: true
          })
      }
  }

  componentWillUpdate = (nextProps, nextState) => {
      localStorage.setItem('user', JSON.stringify(nextState))
  }

  render(){
    if (this.state.signedIn === false){
      return (
        <Router>
          <Route path="/" exact strict component={() => <Login signInState={this.signInState} />}></Route>
          <Redirect to='/' />
        </Router>
      ); 
    } 
    else{
      return (
        <Router>
          <Route path="/feed" exact strict component={() => <Feed signInState={this.signInState} googleId={this.state.googleId} />}></Route>
          <Route path="/profile" exact strict component={Profile}></Route>
          <Redirect to='/feed' />
        </Router>
      ); 
    }
  }
}
export default App;
