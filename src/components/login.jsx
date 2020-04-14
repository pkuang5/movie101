import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import GoogleLogInBtn from './googleLogInBtn'
import Images from '../assets/images';
import Feed from './feed'

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
    constructor(props) {
        super(props);
        this.state = { 
            signedIn: false
        };
    }

    isSignedIn= () => {
        this.setState({
            signedIn: true
        });
    }
    
    render() {
        if (this.state.signedIn === true){
            return(
                <Router>
                    <Route path="/feed" component={Feed} />
                    <Redirect to='/feed' />
                </Router>
            );
        }
        return (
            <Router>
                <div class="flex flex-col h-screen" style={divStyle}>
                    <div class="flex flex-col m-auto box-content h-64 w-70 p-4">
                        <div class="font-serif font-semibold text-6xl tracking-tight text-white select-none">Screenbook</div>
                        <div class="font-sans font-semibold text-white text-center select-none">Watch, Enjoy, Record</div>  
                        <div class="flex justify-center p-12" ><GoogleLogInBtn signedInIsTrue = {this.isSignedIn}  /></div>
                    </div>
                </div>
            </Router>
        );
    }
}

export default Login; 