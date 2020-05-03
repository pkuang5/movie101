import React, { Component } from 'react';
import Gallery from './gallery'
import firebase from '../firebaseConfig'

class Profile extends Component {
    state = { 
        id: '',
        username: '',
        profilePicUrl: '',
        bio: ''
    }
    componentDidMount = () => {   
        var userInfo = firebase.database().ref('users');
        userInfo.orderByChild('userName').equalTo(this.props.username).on("value", (snapshot) => {
            snapshot.forEach((data) => {
                this.setState({
                    id: data.key,    
                    username: data.val().userName,
                    profilePicUrl: data.val().profileURL,
                    bio: data.val().bio,
                })
            });
        });
     }
    render() {
        return (
            <div class="flex flex-col w-screen items-center">
                <div class="flex flex-col w-1/3 items-center pt-6">
                    <div class="rounded-full h-32 w-32 flex bg-cover" style={{backgroundImage: "url('" + this.state.profilePicUrl + "')"}}> </div>
                    <p class="text-xl font-montserrat mt-2">{this.state.username}</p>
                    <p class="text-xs font-montserrat mt-1">{this.state.bio}</p>
                </div>
                <div class="flex w-4/5 justify-between mt-12">
                    <button class="w-1/3 text-lg font-montserrat">Featured</button>
                    <button class="w-1/3 text-lg font-montserrat">Journals</button>
                    <button class="w-1/3 text-lg font-montserrat">Lists</button>
                </div>
                <div class="mt-12 w-4/5 px-8">
                    <Gallery googleId={this.state.id}/>
                </div>
            </div>
        );
    }
}

export default Profile;