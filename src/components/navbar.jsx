
import React, {useState} from 'react';
import {NavLink, useHistory } from 'react-router-dom'
import 'font-awesome/css/font-awesome.min.css'


function Navbar(props) {

  const [displayMenu, setDisplayMenu] = useState(false)
  let history = useHistory();

  let navLinkStyle = { color: "black", textDecoration: "none", paddingRight: "0.3rem", paddingLeft: "0.3rem", paddingBottom: "0.1rem" };
  let activeStyle = { borderBottom: "1px solid #a0aec0" };

  return (
    <nav class="flex items-center py-4 px-10 w-screen">
      <div class="w-full flex justify-between">
        <div class="flex">
          <div class="cursor-pointer" onClick={() => history.push("/search")}>
            <svg width="30" height="30" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" />
              <circle cx="20.5" cy="17.5" r="10.5" stroke="black" stroke-width="2" />
              <line x1="28.1584" y1="25.244" x2="37.256" y2="34.3417" stroke="black" stroke-width="2" stroke-linecap="round" />
            </svg>
          </div>
        </div>
        <div class="flex font-montserrat">
          <div class="mr-4"><NavLink exact to="/" style={navLinkStyle} activeStyle={activeStyle}>Feed</NavLink></div>
          <div class="mr-4"><NavLink exact to="/editor" style={navLinkStyle} activeStyle={activeStyle}>Editor</NavLink></div>
          <div class="mr-4"><NavLink exact to="/discover" style={navLinkStyle} activeStyle={activeStyle}>Discover</NavLink></div>
          <div><NavLink exact to={"/" + props.username} style={navLinkStyle} activeStyle={activeStyle}>Profile</NavLink></div>
          <div>
            <div class="ml-4" onClick={() => setDisplayMenu(!displayMenu)}> <i class="fa fa-lg fa-angle-down"></i> </div>
            {displayMenu ? (
              <div class="absolute mt-1 shadow-sm">
                <div class="py-1 hover:bg-gray-100" onClick={() => setDisplayMenu(!displayMenu)}><NavLink exact to="/settings" style={navLinkStyle}>Settings</NavLink></div>
                <div class="py-1 hover:bg-gray-100 cursor-pointer" style={navLinkStyle} onClick={() => {setDisplayMenu(!displayMenu); props.signInState(false, ''); history.push("/"); }}>Logout</div>
              </div>
            ) : (null)
            }
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;