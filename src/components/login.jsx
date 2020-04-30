import React, { Component } from "react";
import GoogleLogInBtn from './googleLogInBtn'
import Images from '../assets/images';
import Introduction from "./introduction"

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

class Login extends Component {
    render() {
        return (
            <React.Fragment>
                <div class="flex flex-col h-screen" style={divStyle}>
                    <div class="flex flex-col m-auto box-content h-64 w-70 p-4">
                        <div class="font-serif font-semibold text-6xl tracking-tight text-white select-none">Screenbook</div>
                        <div class="font-montserrat font-semibold text-white text-center select-none">Your personal film capsule</div>  
                        <div class="flex justify-center p-12" ><GoogleLogInBtn signInState={this.props.signInState}/></div>
                    </div>
                </div>
                <Introduction />
            </React.Fragment>
        );
    }
}

export default Login; 