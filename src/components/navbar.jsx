
import React, {useState, useEffect, useRef} from 'react';
import {NavLink, useHistory, useLocation } from 'react-router-dom'
import 'font-awesome/css/font-awesome.min.css'


function Navbar(props) {

  const [displayMenu, setDisplayMenu] = useState(false)
  let history = useHistory()
  let location = useLocation()
  let node = useRef()
  let node2 = useRef()
  let node3 = useRef()
  let node4 = useRef()
  let node5 = useRef()
  let node6 = useRef()
  let node7 = useRef()
  let node8 = useRef()
  let node9 = useRef()
  let nodeX = useRef()
  let nodeXI = useRef()
  let nodeXII = useRef()
  let nodeXIII = useRef()
  let navLinkStyle = { color: "black", textDecoration: "none", paddingRight: "0.3rem", paddingLeft: "0.3rem", paddingBottom: "0.1rem" };
  let activeStyle = { fontWeight: 'bolder' };
  
  useEffect (() => {
    document.addEventListener('mousedown', handleClick, false);
  }, []) 
  
  function handleClick (e) {
  
    if (node.current === e.target || node2.current === e.target || node3.current === e.target || node4.current === e.target
      || node5.current === e.target || node6.current === e.target || node7.current === e.target || node8.current === e.target
      || node9.current === e.target || nodeX.current === e.target || nodeXI.current === e.target || nodeXII.current === e.target
      || nodeXIII.current === e.target) {
        return;
    }
    handleClickOutside(e)
  }

  function handleClickOutside (e) {
    setDisplayMenu(false)
  }

  return (
    <React.Fragment>
      <div class="sm:flex sm:flex-col hidden">
        <div  class="flex items-center justify-between pt-4 px-6 w-screen">
          <div class="cursor-pointer" onClick={() => history.push("/search")}>
            <svg width="30" height="30" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" />
              <circle cx="20.5" cy="17.5" r="10.5" stroke="black" strokeWidth={location.pathname === "/search" ? "4" : "2"}/>
              <line x1="28.1584" y1="25.244" x2="37.256" y2="34.3417" stroke="black" strokeWidth={location.pathname === "/search" ? "4" : "2"} strokeLinecap="round" />
            </svg>
          </div>
          <div class="flex font-montserrat">
              <div class="mr-3"><NavLink exact to="/" style={navLinkStyle} activeStyle={activeStyle}>Feed</NavLink></div>
              <div class="mr-3"><NavLink exact to="/editor" style={navLinkStyle} activeStyle={activeStyle}>Editor</NavLink></div>
              <div class="mr-3"><NavLink exact to="/watchlist" style={navLinkStyle} activeStyle={activeStyle}>Watchlist</NavLink></div>
              <div class="mr-3"><NavLink exact to="/discover" style={navLinkStyle} activeStyle={activeStyle}>Discover</NavLink></div>
              <div class="mr-3">
                <NavLink exact to={"/" + props.username} >
                  {location.pathname === "/" + props.username ?
                  <i class="fa fa-user fa-lg text-black" />
                  :
                  <i class="fa fa-user-o text-black" />}
                </NavLink>
              </div>
              <div onClick={() => setDisplayMenu(!displayMenu)}> <i ref = {nodeXII} class="fa fa-lg fa-angle-down" /> </div>
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
      </div>
      <div class="flex flex-col w-screen p-3 bg-black sm:hidden">
        <div class="flex justify-between items-center">
          <div class="cursor-pointer" onClick={() => history.push("/search")}>
            <i class="fa fa-search text-white fa-lg" />
          </div>
          {displayMenu ?
            <i ref = {nodeXI}class="fa fa-times text-white fa-lg " onClick={() => setDisplayMenu(!displayMenu)} />
            :
            <i class="fa fa-bars text-white fa-lg " onClick={() => setDisplayMenu(!displayMenu)} />
          }
        </div>
      </div>
      {displayMenu ?
        <div ref = {node3} class="flex w-screen bg-black absolute p-3 sm:hidden">
          <div ref = {node4} class="grid grid-cols-1 gap-2 text-white">
              <p ref = {node5} onClick={() => {history.push('/'); setDisplayMenu(!displayMenu)}} class={location.pathname === "/" ? "font-extrabold w-full": "w-full"}>Feed</p>
              <p ref = {node6}onClick={() => {history.push('/editor'); setDisplayMenu(!displayMenu)}} class={location.pathname === "/editor" ? "font-extrabold w-full": "w-full"}>Editor</p>
              <p ref = {nodeXIII}onClick={() => {history.push('/watchlist'); setDisplayMenu(!displayMenu)}} class={location.pathname === "/watchlist" ? "font-extrabold w-full": "w-full"}>Watchlist</p>
              <p ref = {node7}onClick={() => {history.push('/discover'); setDisplayMenu(!displayMenu)}} class={location.pathname === "/discover" ? "font-extrabold w-full": "w-full"}>Discover</p>
              <p ref = {node8}onClick={() => {history.push('/' + props.username); setDisplayMenu(!displayMenu)}} class={location.pathname === "/" + props.username ? "font-extrabold w-full": "w-full"}>Profile</p>
              <p ref = {node9}onClick={() => {history.push('/settings'); setDisplayMenu(!displayMenu)}} class={location.pathname === "/settings" ? "font-extrabold w-full": "w-full"}>Settings</p>
              <p ref = {nodeX}onClick={() => {history.push('/'); props.signInState(false, ''); setDisplayMenu(!displayMenu)}} >Logout</p>
          </div>
        </div>
        : null}
    </React.Fragment>
  );
}

export default Navbar;
