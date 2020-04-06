import React, { Component } from "react";
import Login from './googleLogInBtn'
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
                {/* <Navbar class="content-start" isSignedIn= {this.isSignedIn} /> */}
                <div class="flex flex-col m-auto box-content h-64 w-70 p-4">
                    <div class="font-serif font-semibold text-6xl tracking-tight text-white select-none">Screenbook</div>
                    <div class="font-sans font-semibold text-white text-center select-none">Watch, Enjoy, Record</div>
                    <div class="flex justify-center p-12"><Login /></div>
                </div>
            </div>
        );
    }
}


export default Background; 