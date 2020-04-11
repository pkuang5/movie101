import React, { Component } from "react";
import Login from './googleLogInBtn'
import Images from '../assets/images';
import Nav from './navbar';


function selectBackgroundImage(){
    let selection = Math.floor(Math.random() * Images.length);
    return "url('"+Images[selection]+"')";
}

const divStyle = {
    backgroundImage: selectBackgroundImage(),
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
  };

class Background extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            signedIn: false       
        };
    }

    isSignedIn= (newId) => {
        this.setState({
            signedIn: true
            
        })
    }

    render() {
        return (
            <div class="flex flex-col h-screen" style={divStyle}>
                { <Nav class="content-start"  /> }
                <div class="flex flex-col m-auto box-content h-64 w-70 p-4">
                    <div class="font-serif font-semibold text-6xl tracking-tight text-white select-none">Screenbook</div>
                    <div class="font-sans font-semibold text-white text-center select-none">Watch, Enjoy, Record</div>
                    <div class="flex justify-center p-12" ><Login signedInIsTrue = {this.isSignedIn}  /></div>
                </div>
            </div>
        );
    }
}


export default Background; 