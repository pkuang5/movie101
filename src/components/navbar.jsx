
import React, {useState, useEffect, useRef} from 'react';
import {NavLink, useHistory, useLocation } from 'react-router-dom'
import 'font-awesome/css/font-awesome.min.css'


function Navbar(props) {

  const [displayMenu, setDisplayMenu] = useState(false)
  let history = useHistory()
  let location = useLocation()
  let node = useRef()
  let node2 = useRef()
  let navLinkStyle = { color: "black", textDecoration: "none", paddingRight: "0.3rem", paddingLeft: "0.3rem", paddingBottom: "0.1rem" };
  let activeStyle = { fontWeight: 'bolder' };
  
  useEffect (() => {
    document.addEventListener('mousedown', handleClick, false);
  }, []) 
  
  function handleClick (e) {
    console.log(node2)
    console.log(e)
    if (node.current === e.path[0] || node2.current === e.path[0] ) {
        return;
    }
    handleClickOutside(e)
  }

  function handleClickOutside (e) {
    setDisplayMenu(false)
  }

  return (
    <React.Fragment>
      <div  class="flex items-center justify-between pt-4 px-6 w-screen">
        <div class="cursor-pointer" onClick={() => history.push("/search")}>
          <svg width="30" height="30" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" />
            <circle cx="20.5" cy="17.5" r="10.5" stroke="black" stroke-width={location.pathname === "/search" ? "4" : "2"}/>
            <line x1="28.1584" y1="25.244" x2="37.256" y2="34.3417" stroke="black" stroke-width={location.pathname === "/search" ? "4" : "2"} stroke-linecap="round" />
          </svg>
        </div>
        <div class="flex font-montserrat">
            <div class="mr-3"><NavLink exact to="/" style={navLinkStyle} activeStyle={activeStyle}>Feed</NavLink></div>
            <div class="mr-3"><NavLink exact to="/editor" style={navLinkStyle} activeStyle={activeStyle}>Editor</NavLink></div>
            <div class="mr-3"><NavLink exact to="/discover" style={navLinkStyle} activeStyle={activeStyle}>Discover</NavLink></div>
            <div class="mr-3">
              <NavLink exact to={"/" + props.username} >
                {location.pathname === "/" + props.username ?
                <i class="fa fa-user fa-lg" style={{color: 'black'}}/>
                :
                <i class="fa fa-user-o" style={{color: 'black'}}/>}
              </NavLink>
            </div>
            <div  onClick={() => setDisplayMenu(!displayMenu)}> <i class="fa fa-lg fa-angle-down" /> </div>
        </div>
      </div>
      <div class="flex w-screen justify-end">
        {displayMenu ? (
            <div  class="shadow-sm absolute bg-white border rounded font-montserrat mt-1 mr-2">
              <div ref = {node} class="py-2 px-3 hover:bg-gray-100 cursor-pointer" onClick={() => {history.push('/settings'); setDisplayMenu(!displayMenu);}}>Settings</div>
              <div ref = {node2} class="py-2 px-3 hover:bg-gray-100 cursor-pointer" style={navLinkStyle} onClick={() => {setDisplayMenu(!displayMenu); props.signInState(false, ''); history.push("/"); }}>Logout</div>
            </div>
          ) : null
        }
      </div>
    </React.Fragment>
  );
}

export default Navbar;
