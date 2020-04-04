import React, { Component } from "react";
import Navbar from './navbar'
import Images from '../assets/images';


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
            isSignedIn: false
        };
    }

    isSignedIn= () => {
        console.log("yay you signed in!")
        this.setState({
            isSignedIn: true
        });
    }

    render() {
        return (
            <div class="h-screen" style={divStyle}><Navbar isSignedIn= {this.isSignedIn} /></div>
        );
    }
}


export default Background; 