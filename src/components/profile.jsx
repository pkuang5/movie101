import React, { Component } from 'react';
import Gallery from './gallery'
import firebase from '../firebaseConfig'

class Profile extends Component {
    state = { 
        id: '',
        username: '',
        profilePicUrl: '',
        bio: '',
        featured: true,
    }
    componentDidMount = () => {   
        var userInfo = firebase.database().ref('users');
        userInfo.orderByChild('userName').equalTo(this.props.username).once("value", (snapshot) => {
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

    handleFeatured = (bool) => {
        this.setState({featured: bool})
    }

    render() {
        return (
            <div class="flex flex-col w-screen items-center mt-3">
                <div class="w-2/3 items-center">
                    <div class="flex flex-col items-center pt-6">
                        <div class="rounded-full h-32 w-32 flex bg-cover" style={{backgroundImage: "url('" + this.state.profilePicUrl + "')"}}> </div>
                        <p class="text-xl font-montserrat mt-2">{this.state.username}</p>
                        <p class="text-xs font-montserrat mt-1">{this.state.bio}</p>
                    </div>
                    <div class="flex text-lg font-montserrat justify-around select-none mt-3">
                        <div class={this.state.featured ? 'border-b border-black' : null} onClick={() => this.handleFeatured(true)}>Featured</div>
                        <div class={!this.state.featured ? 'border-b border-black' : null} onClick={() => this.handleFeatured(false)}>Journals</div>
                    </div>
                    <div class="mt-3 px-8">
                        <Gallery googleId={this.state.id} username={this.state.username} featured={this.state.featured}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;