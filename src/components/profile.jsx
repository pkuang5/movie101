import React, { Component } from 'react';
import Gallery from './gallery'
import firebase from '../firebaseConfig'

class Profile extends Component {
    state = { 
        username: 'pkuang',
        profilePicUrl: 'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/s320x320/73714020_434465267246297_8758241746011291648_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_ohc=kMkRJd7b9ckAX_xG870&oh=691d19c0d078570edc3dd94409b2f03b&oe=5ECF02E0',
        bio: "on a quest to find perpetual energy"
    }

    componentDidMount = () => {
        var userInfo = firebase.database().ref('users/' + this.props.googleId);
        userInfo.on('value', (snapshot) => {
          if (snapshot.val()) this.setState({
              username: snapshot.val().userName,
              profilePicUrl: snapshot.val().profileURL,
              bio: snapshot.val().bio,
            })
        })
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
                    <Gallery />
                </div>
            </div>
        );
    }
}

export default Profile;