import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import firebase from "firebase";
import '../App.css'
import Noty from 'noty'
import 'noty/lib/noty.css'
import 'noty/lib/themes/bootstrap-v4.css'
import {storage} from "../firebaseConfig";

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            fName: '',
            lName: '',
            email: '',
            bio: '',
            url: '',
            image: '', 
        };
    }

    showNotification = () => {
        new Noty({
            type: 'success',
            theme: 'bootstrap-v4',
            layout: 'topRight',
            text: 'You Changes Have Been Saved!',
            timeout: 3000
        }).show()
    }
   
    handleChange = e => {
        if(e.target.files[0]) {
            
            let image = e.target.files[0];
            console.log(image);
            const uploadTask = storage.ref(`images/${image.name}`).put(image);
            uploadTask.on('state_changed',
        
            () => {          
                    storage.ref('images').child(image.name).getDownloadURL().then(url => {
                        this.setState({url: url})
                        firebase
                        .database()
                        .ref("users/" + this.props.googleId) 
                        .update({  
                            profileURL: url,
                        }); 
                    })
                
                });    
            }
            else {
                console.log('ERROR')
            }
    }
    handleChangeUserName = (e) => {
        this.setState({ username: e.target.value })

    }
    handleFirstName = (e) => {
        this.setState({ fName: e.target.value })
    }
    handleLastName = (e) => {
        this.setState({ lName: e.target.value })
    }
    handleEMAIL = (e) => {
        this.setState({ email: e.target.value })
    }

    handleBio = (e) => {
        this.setState({ bio: e.target.value })
    }
    

    handleSubmit = (e) => {
       console.log(this.props.googleId)
        firebase
            .database()
            .ref("users/" + this.props.googleId) 
            .update({  
                userName: this.state.username,
                firstName: this.state.fName,
                lastName: this.state.lName,
                email: this.state.email,
                bio: this.state.bio,
                profileURL: this.state.url,
            });
        this.showNotification()
        
    }
    componentDidMount = () => {
        console.log()
        var userInfo = firebase.database().ref('users/' + this.props.googleId);
        userInfo.on('value', (snapshot) => {
            this.setState({
                fName: snapshot.val().firstName,
                lName: snapshot.val().lastName,
                username: snapshot.val().userName,
                email: snapshot.val().email,
                bio: snapshot.val().bio,
                url: snapshot.val().profileURL
            });  
          })
          console.log(this.props.googleId) 
    }

    render() {
        return (
            <form class="w-screen flex justify-center">

                  <div class="flex flex-wrap -mx-3 mb-6 flex justify-center w-1/3 font-montserrat font-semibold" >
                    <div class = "flex w-full h-24 mb-4 ">
                        <div  class="rounded-full w-1/5 flex items-center justify-center bg-cover items-center justify-center mr-8 pt-8" style={{backgroundImage: "url('" + this.state.url + "')"}}> 
                        <input type = "file" onChange = {this.handleChange} name="file" id="file" class="w-full h-full opacity-0" data-multiple-caption="{count} files selected" multiple/>
                        </div>
                        
                        <div class = "w-4/5 flex items-end ">
                            <div class = " h-18 w-full">
                                <label class=" tracking-wide text-gray-700 text-sm font-bold mb-2" for="grid-password"> User Name </label>
                                <input onChange={this.handleChangeUserName} class="appearance-none block w-full text-gray-700  border-solid border-2 border-black-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder={this.state.username}/>
                            </div>
                        </div>
                    </div>
                    <div class = "w-full flex justify-start">
                        <div class = "w-full">
                               <label class="text-left font-bold text-gray-700 text-sm  mb-2 " for="grid-first-name"> Bio </label>
                                <input onChange={this.handleBio} class="appearance-none block w-full text-gray-700 border-solid border-2 border-black-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder={this.state.bio}/>
                        </div>
                    </div>
                    <div class = "flex w-full">
                        <div class = " w-1/2 mr-2 mb-4">
                            <label class=" tracking-wide text-gray-700 text-sm font-bold mb-2" for="grid-last-name">
                                First Name
                            </label>
                            <input onChange={this.handleFirstName} class="appearance-none block w-full  text-gray-700 border-solid border-2 border-black-600 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder={this.state.fName}/>
                        </div>
                        <div class = "w-1/2 ml-2">
                            <label class=" tracking-wide text-gray-700 text-sm font-bold mb-2" for="grid-last-name">
                            Last Name
                            </label>
                            <input onChange={this.handleLastName} class="appearance-none block w-full  text-gray-700 border-solid border-2 border-black-600 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder={this.state.lName}/>
                        </div>
                    </div>
                    
                    <div class = "w-full flex justify-start">
                        <div class = "w-full">
                
                            <label class=" tracking-wide text-gray-700 text-sm font-bold mb-2" for="grid-city"> Email </label>
                            <input onChange={this.handleEMAIL} class="appearance-none block w-full  text-gray-700 border-solid border-2 border-black-600 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text"  placeholder={this.state.email}/>
                        </div>
                    </div>
                    <div class = "flex mt-6">
                        <button  onClick={(e) => this.handleSubmit(e)} class="  text-sm border-solid border-2 border-color-beige  py-2 px-4 rounded" type="button">
                            Save Changes
                        </button>
                    </div>
             </div>
          </form> 
           
        );
    }
}
export default Settings;

