import React, { Component } from "react";
import "./App.css";
import "./styles/app.css";
import Login from "./components/login"
import LogOut from "./components/googleLogOutBtn"
import Feed from "./components/feed"
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

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
          <Route path="/" exact strict component={() => <Feed signInState={this.signInState} googleId={this.state.googleId} />}></Route>
          <Redirect to='/' />
        </Router>
      ); 
    }
  }
}
export default App;
