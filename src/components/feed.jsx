import React, { Component } from 'react';
import MovieRow from './movieRow'
import firebase from "../firebaseConfig";

class Feed extends Component {
    state = {
        firstName: "",
    }
    
    componentDidMount = () => {
        var userInfo = firebase.database().ref('users/' + this.props.googleId)
        userInfo.once('value', (snapshot) => {
            if (snapshot.val()) this.setState({firstName: snapshot.val().firstName})
        })
    }

    render() {
        return (
                <div class="flex flex-col w-screen items-center mt-3">
                    <div class="flex flex-col w-2/3 items-center">
                        <div class="flex flex-col items-center w-full">
                            <p class="font-serif text-3xl font-bold">Screenbook</p>
                            <p class="font-montserrat text-sm text-center w-1/2"> Welcome, {this.state.firstName}! This is your feed. <br></br> See what movies are popular in the Screenbook community and follow other members to see their journals. Or, get started on your own journal. </p>
                            <button class="button-color-beige hover:opacity-75 font-montserrat font-semibold text-white py-2 px-4 rounded w-40">+ add entry</button>
                        </div>
                        <div class="w-full mt-10"><MovieRow/></div>
                    </div>
                </div>
        );
    }
}

export default Feed;