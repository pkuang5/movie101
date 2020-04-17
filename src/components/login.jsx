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
    userData;
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
       // localStorage.setItem('logMe',true)
    }
    componentDidMount() {
        this.userData = JSON.parse(localStorage.getItem('user'))
        if (localStorage.getItem('user')) {
            this.setState ({
                signedIn: true
            })
        }
        
       
    }
    componentWillUpdate(nextProps, nextState)
    {
        localStorage.setItem('user', JSON.stringify(nextState))
    }
    
    render() {
        
        //if (localStorage.getItem('logMe') === "true"){
         if (this.state.signedIn === true){
            return(
                <Router>
                    <Route path="/feed" exact component={Feed} />
                    <Redirect to='/feed' />
                </Router>
               
            );
        }
        else{
            return (
                <Router>
                
                <div class="flex flex-col h-screen" style={divStyle}>
                    <div class="flex flex-col m-auto box-content h-64 w-70 p-4">
                        <div class="font-serif font-semibold text-6xl tracking-tight text-white select-none">Screenbook</div>
                        <div class="font-montserrat font-semibold text-white text-center select-none">Your personal film capsule</div>  
                        <div class="flex justify-center p-12" ><GoogleLogInBtn signedInIsTrue = {this.isSignedIn}  /></div>
                    </div>
                </div>
              
                </Router>
            );
        }
        }
        
       
       

}

export default Login; 