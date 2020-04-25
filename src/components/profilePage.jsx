import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import firebase from "firebase";
import '../App.css'
import axios from 'axios'
import Login from "./googleLogInBtn"; // need this to use export method for google id
import ImageUpload from './imageUpload'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            fName: '',
            lName: '',
            email: '',
            bio: '',
            signedIn: '',
            url: '',
           
        };
    }
   
    handleChange(e) {
        this.state.username = e.target.value
        // set the changed state
        this.setState({ username: this.state.username })


    }
    handleFirstName(e) {
        this.state.fName = e.target.value
        // set the changed state
        this.setState({ fName: this.state.fName })
    }
    handleLastName(e) {
        this.state.lName = e.target.value
        // set the changed state
        this.setState({ lName: this.state.lName })
    }
    handleEMAIL(e) {
        this.state.email = e.target.value
        // set the changed state
        this.setState({ email: this.state.email })
    }

    handleBio(e) {
        this.state.bio = e.target.value
        // set the changed state
        this.setState({ bio: this.state.bio })
    }
    

    handleSubmit(e) {
       
        firebase
            .database()
            .ref("users/" + this.props.googleId) 
            .update({  
                userName: this.state.username,
                firstName: this.state.fName,
                lastName: this.state.lName,
                email: this.state.email,
                bio: this.state.bio,
                profileURL: this.props.profilePic,


            });
            console.log(this.props.googleId)
            console.log(this.props.profilePic)
        
    }
    componentDidMount = () => {
        console.log()
        var userInfo = firebase.database().ref('users/' + localStorage.getItem('id'));
        userInfo.on('value', (snapshot) => {
            this.setState({fName: snapshot.val().firstName});
            this.setState({lName: snapshot.val().lastName});
            this.setState({username: snapshot.val().userName});
            this.setState({email: snapshot.val().email});
            this.setState({bio: snapshot.val().bio});
            this.setState({url: snapshot.val().profileURL});
            
          })
         
          console.log(this.props.profilePic)
          this.setState({signedIn: true});  // new add to keep page from going back to login upon refresh
        // this.props.signInState(true, localStorage.getItem('id')); tried using this function from app.js but crashed program
         
    }
      componentWillUpdate = (nextProps, nextState) => {
        localStorage.setItem('user', JSON.stringify(nextState))
      }
      myProfile = "url('" + this.props.profilePic + "')"
      
   
    render() {
        return (
        
            <form class="w-screen flex justify-center">
                {/* <ImageUpload/> */}
            
                 <div class="flex flex-wrap -mx-3 mb-6 flex justify-center w-1/3 font-montserrat font-semibold " >
                    <div class = "flex w-full h-24 mb-4">
                        <div class="rounded-full w-1/5 flex items-center justify-center bg-red-100 bg-local mr-8" style={{backgroundImage: this.myProfile}}> </div>
                        <div class = "w-4/5 flex items-end ">
                            <div class = " h-18 w-full">
                                <label class=" tracking-wide text-gray-700 text-sm font-bold mb-2" for="grid-password"> User Name </label>
                                <input onChange={this.handleChange.bind(this)} class="appearance-none block w-full text-gray-700  border-solid border-8 border-black-800 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder={this.state.username}/>
                            </div>
                        </div>
                    </div>
                    <div class = "w-full flex justify-start">
                        <div class = "w-full">
                               <label class="text-left font-bold text-gray-700 text-sm  mb-2 " for="grid-first-name"> Bio </label>
                                <input onChange={this.handleBio.bind(this)} class="appearance-none block w-full text-gray-700 border-solid border-8 border-black-800 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder={this.state.bio}/>
                        </div>
                    </div>
                    <div class = "flex w-full">
                        <div class = " w-1/2 mr-2 mb-4">
                            <label class=" tracking-wide text-gray-700 text-sm font-bold mb-2" for="grid-last-name">
                                First Name
                            </label>
                            <input onChange={this.handleFirstName.bind(this)} class="appearance-none block w-full  text-gray-700 border-solid border-8 border-black-800 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder={this.state.fName}/>
                        </div>
                        <div class = "w-1/2 ml-2">
                            <label class=" tracking-wide text-gray-700 text-sm font-bold mb-2" for="grid-last-name">
                            Last Name
                            </label>
                            <input onChange={this.handleLastName.bind(this)} class="appearance-none block w-full  text-gray-700 border-solid border-8 border-black-800 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder={this.state.lName}/>
                        </div>
                    </div>
                    
                    <div class = "w-full flex justify-start">
                        <div class = "w-full">
                
                            <label class=" tracking-wide text-gray-700 text-sm font-bold mb-2" for="grid-city"> Email </label>
                            <input onChange={this.handleEMAIL.bind(this)} class="appearance-none block w-full  text-gray-700 border-solid border-8 border-black-800 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder={this.state.email}/>
                        </div>
                    </div>
                    <div class = "flex mt-6">
                        <button  onClick={(e) => this.handleSubmit(e)} class="  text-sm border-solid border-8 border-black-800  py-2 px-4 rounded" type="button">
                            Save Changes
                        </button>
                    </div>
             </div>
          </form>
           
        );
    }
}
export default Profile;

