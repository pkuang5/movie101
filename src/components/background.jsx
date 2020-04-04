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
            <div class="flex flex-col h-screen" style={divStyle}>
                <Navbar class="content-start" isSignedIn= {this.isSignedIn} />
                <span class="m-auto font-sans font-semibold text-3xl tracking-tight text-white">Target</span>
            </div>
        );
    }
}


export default Background; 