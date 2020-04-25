import React, { Component } from "react";
import "./App.css";
import "./styles/app.css";
import { BrowserRouter as Router, Route, Redirect, NavLink, Switch } from 'react-router-dom'
import Login from "./components/login"
import Feed from "./components/feed"
import Editor from "./components/editor"
import Films from "./components/films"
import Profile from "./components/profilePage";
import firebase from "firebase";

class App extends Component {
  state = {
    signedIn: false,
    googleId: '',
    profilePic: ''
  }

  navLinkStyle = {color:"black", textDecoration:"none", paddingRight: "0.3rem", paddingLeft: "0.3rem", paddingBottom: "0.1rem"};
  activeStyle = {borderBottom: "1px solid #a0aec0"};

  signInState = (bool, id) => {
    this.setState({
      signedIn: bool,
      googleId: id,
    })
    localStorage.setItem('logKey',bool)
    //console.log(this.state.signedIn)
  }
  

  componentDidMount = () => {
    let localStorageObject = JSON.parse(localStorage.getItem('user'));
    if (localStorageObject && localStorageObject.signedIn === true) {
      this.setState({
        signedIn: true, // used to be true but causes problems upon refresh
        //signedIn: localStorage.getItem('logKey'), this line of code does the same thing as the above
        googleId: localStorage.getItem('id'),
       // profilePic: localStorage.getItem('url')  
      })
    }
    console.log(this.state.signedIn)
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
        <Router>
          <Route path="/" exact strict component={() => <Login signInState={this.signInState} setProfilePic = {this.setProfilePic} />}></Route>
          <Redirect to='/' />
        </Router>
      );
    }
    else {
      return (
        <Router>
          <nav class="flex items-center flex-wrap p-4 px-10 font-serif">
            <div class="w-full block flex-grow flex items-end">
              <div class="text-base flex-grow">
                <svg width="30" height="30" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" />
                  <circle cx="20.5" cy="17.5" r="10.5" stroke="black" stroke-width="2" />
                  <line x1="28.1584" y1="25.244" x2="37.256" y2="34.3417" stroke="black" stroke-width="2" stroke-linecap="round" /></svg>
              </div>
              <div>
                <div class="font-montserrat block inline-block mt-0 mr-4"><NavLink to="/feed" style={this.navLinkStyle} activeStyle={this.activeStyle}>Feed</NavLink></div>
                <div class="font-montserrat block inline-block mt-0 text-black cursor-pointer mr-4"><NavLink to="/editor" style={this.navLinkStyle} activeStyle={this.activeStyle}>Editor</NavLink></div>
                <div class="font-montserrat block inline-block mt-0 text-black cursor-pointer mr-6"><NavLink to="/films" style={this.navLinkStyle} activeStyle={this.activeStyle}>Films</NavLink></div>
                <div class="font-montserrat block inline-block mt-0 text-black cursor-pointer mr-4"><NavLink to="/profile" style={this.navLinkStyle} activeStyle={this.activeStyle}>Profile</NavLink></div>
                <div class="font-montserrat block inline-block mt-0 text-black cursor-pointer mr-4" onClick={ ()=>this.signInState(false,'')}>Logout</div>
              </div>
            </div>
          </nav>
          <Switch>
            <Route exact path="/feed" exact strict component={() => <Feed signInState={this.signInState} googleId={this.state.googleId} />}></Route>
            <Route exact path="/editor" exact strict component={Editor}></Route>
            <Route exact path="/films" exact strict component={Films}></Route>
            <Route exact path="/profile" exact strict component={() => <Profile signInState={this.signInState} googleId={this.state.googleId} profilePic = {this.state.profilePic}/>}></Route>
            <Redirect to='/feed' />
          </Switch>
         
        </Router>
      );
    }
  }
}
export default App;
