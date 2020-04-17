import React, { Component } from "react";
import {BrowserRouter as Router, Link} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Profile from "./profilePage";
import LogOut  from "./googleLogOutBtn"


function Navbar(props)  {
  // TODO: have under border for the tab that you are in
  return (
    <Router>     
        <nav class="flex items-center flex-wrap p-4 px-10 font-serif">
          <div class="w-full block flex-grow flex items-end">
            <div class="text-base flex-grow">
              <svg width="30" height="30" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white"/>
              <circle cx="20.5" cy="17.5" r="10.5" stroke="black" stroke-width="2"/>
              <line x1="28.1584" y1="25.244" x2="37.256" y2="34.3417" stroke="black" stroke-width="2" stroke-linecap="round"/></svg>
            </div>
            <div>
              <a href="#responsive-header" class="font-montserrat block inline-block mt-0 text-black hover:border-gray-200 hover:text-gray-700 mr-4">
                Feed
              </a>
              <a href="#responsive-header" class="font-montserrat block inline-block mt-0 text-black hover:text-gray-700 mr-4">
                Editor
              </a>
              <a href="#responsive-header" class="font-montserrat block inline-block mt-0 text-black hover:text-gray-700 mr-6">
                Films
              </a>
              <a href="#responsive-header" class="font-montserrat block inline-block text-black mt-0 mr-4 font-semibold">{props.name}</a>
            </div>
            <div className = "App"> 
              <ul>
                <li>
                <Link to = "/profile">Profile</Link> 
                </li>
              </ul>
              <Route path = "/profile" exact strict component = {Profile}/>
            </div>
            <LogOut signInState = {props.signInState} />
          </div>
        </nav>  
    </Router>
  );
}


export default Navbar;
