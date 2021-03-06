import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import firebase from './firebaseConfig'
import "./App.css";
import "./styles/app.css";
import Login from "./components/login"
import Feed from "./components/feed"
import Editor from "./components/editor"
import Discover from "./components/discover"
import Settings from "./components/settings"
import Profile from "./components/profile"
import Navbar from "./components/navbar"
import Movie from "./components/movie"
import Search from "./components/search"
import Film from "./components/film"
import WatchList from "./components/watchList"
import About from './components/about'

class App extends Component {
  state = {
    signedIn: false,
    googleId: '',
    username: '',
  }
  signInState = (bool, id, name) => {
    this.setState({
      signedIn: bool,
      googleId: id,
      username: name
    })
  }
  componentDidMount = () => {
    let localStorageObject = JSON.parse(localStorage.getItem('user'));
    if (localStorageObject && localStorageObject.signedIn === true) {
        this.setState({
          signedIn: true,
          googleId: localStorageObject.googleId,
       
        })
        var userInfo = firebase.database().ref('users/' + localStorageObject.googleId)
        userInfo.on('value', (snapshot) => {
          if (snapshot.val()) {
            this.setState({username: snapshot.val().userName})
          }
        })
    }
  }
  componentWillUpdate = (nextProps, nextState) => {
    localStorage.setItem('user', JSON.stringify(nextState))
  }
  render() {
    if (this.state.signedIn === false) {
      return (
        <Router>
          <Switch>
            <Route path="/" exact strict component = {() => <Login signInState={this.signInState} username = {this.setUsername}/>}></Route>
            <Route path="/about" exact strict component = {() => <About/>}></Route>
          </Switch>
        </Router>
      );
    }
    else {
      return (
        <Router>
          <Navbar signInState={this.signInState} username={this.state.username} />
          <Switch>
            <Route path="/" exact strict component={() => <Feed signInState={this.signInState} googleId={this.state.googleId} />}></Route>
            <Route path="/editor" exact strict component={() => <Editor googleId={this.state.googleId} username = {this.state.username}/>}></Route>
            <Route path="/discover" exact strict component={() => <Discover/>}></Route>
            <Route path="/settings" exact strict component={() => <Settings googleId={this.state.googleId} signInState={this.signInState} signInStatus={this.state.signedIn}/>}></Route>
            <Route path="/about" exact strict component = {() => <About googleId = {this.state.googleId} />}></Route> 
            <Route path="/search" exact strict component={() => <Search googleId={this.state.googleId} username={this.state.username} />}></Route>
            <Route path="/watchlist" exact strict component={() => <WatchList id={this.state.googleId}/>}></Route>
            <Route path="/:username" exact strict render={({match})=><Profile username={match.params.username} appId={this.state.googleId}/>}/>
            <Route path="/:username/movies/:id" exact strict render={({match})=><Movie movieId={match.params.id} username={match.params.username} localUser={match.params.username===this.state.username ? true : false}/>}/>
            <Route path="/films/:id" exact strict render={({match}) => <Film movieId={match.params.id} />} />
          </Switch>
        </Router>
      );
    }
  }
}
export default App;
