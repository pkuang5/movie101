
import React, { Component, useState} from 'react';
import {NavLink, useHistory } from 'react-router-dom'
import 'font-awesome/css/font-awesome.min.css'


function Navbar(props){
  
    const [displayMenu, setDisplayMenu] = useState(false)
    let history = useHistory();
    
    let navLinkStyle = {color:"black", textDecoration:"none", paddingRight: "0.3rem", paddingLeft: "0.3rem", paddingBottom: "0.1rem"};
    let activeStyle = {borderBottom: "1px solid #a0aec0"};

    return (
        <nav class="flex items-center flex-wrap p-4 px-10 font-serif">
            <div class="w-full block flex-grow flex items-end">
              <div class="text-base flex-grow">
                <svg width="30" height="30" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" />
                  <circle cx="20.5" cy="17.5" r="10.5" stroke="black" stroke-width="2" />
                  <line x1="28.1584" y1="25.244" x2="37.256" y2="34.3417" stroke="black" stroke-width="2" stroke-linecap="round" /></svg>
              </div>
              <div>
                <div class="font-montserrat block inline-block mt-0 mr-4"><NavLink exact to="/" style={navLinkStyle} activeStyle={activeStyle}>Feed</NavLink></div>
                <div class="font-montserrat block inline-block mt-0 mr-4"><NavLink exact to="/editor" style={navLinkStyle} activeStyle={activeStyle}>Editor</NavLink></div>
                <div class="font-montserrat block inline-block mt-0 mr-4"><NavLink exact to="/films" style={navLinkStyle} activeStyle={activeStyle}>Films</NavLink></div>
                <div class="font-montserrat block inline-block mt-0 mr-4"><NavLink exact to={"/" + props.username} style={navLinkStyle} activeStyle={activeStyle}>Profile</NavLink></div>
                <div  className="font-montserrat block inline-block mt-0 ml-4 mr-4"  >
                  <div className="mr-8" onClick={()=> setDisplayMenu(!displayMenu)}> <i class="fa fa-lg fa-angle-down"></i> </div>
                  { displayMenu ? (
                        <div class = "absolute">
                            <div><NavLink exact to="/settings" style={navLinkStyle} activeStyle={activeStyle}>Settings</NavLink></div>  
                            <div class = "cursor-pointer" style={navLinkStyle} onClick={ () => { props.signInState(false, '');history.push("/"); }}>Logout</div>    
                        </div>
                        ):( null)
                  }
              </div>
            </div>
          </div>
        </nav>
    );
}

export default Navbar;