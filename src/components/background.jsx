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

function Background() {
    return (
        <div class="h-screen" style={divStyle}><Navbar /></div>
    );
}


export default Background; 