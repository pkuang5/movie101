import React, { Component } from 'react';
import 'react-dropdown/style.css';
import { NavLink } from 'react-router-dom'

class Drop extends Component {
   
    constructor(){
        super();
        this.state = {
              displayMenu: false,
            };
       };
       
       showDropdownMenu = (event) => {
           event.preventDefault();
           this.setState({ 
               displayMenu: true,
               
            }, () => {
           document.addEventListener('click', this.hideDropdownMenu);
           });
         }
       
         hideDropdownMenu = () => {
           this.setState({ displayMenu: false }, () => {
             document.removeEventListener('click', this.hideDropdownMenu);
           });
         }
       
         render() {
         
           return (
               
               <div  className="dropdown" style = {{background:"white",width:"90"}} >
                <div className="button" onClick={this.showDropdownMenu}> Profile </div>
                 { this.state.displayMenu ? (
                 <ul>
                    <NavLink exact to="/profile" >Settings</NavLink>
                 </ul>
               ):
               (
                 null
               )
               }
              </div>
       
           );
         }
       
}
export default Drop