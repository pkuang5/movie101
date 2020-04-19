import React, { Component } from 'react';
import MovieRow from './movieRow'
import firebase from "../firebaseConfig";


class Feed extends Component {
    state = {
        firstName: ""
    }

    // componentDidMount = () => {
    //     console.log()
    //     var userInfo = firebase.database().ref('users/' + this.props.googleId);
    //     userInfo.on('value', (snapshot) => {
    //         this.setState({firstName: snapshot.val().firstName});
    //       })
    // }


    render() {
        return (
            <React.Fragment>
                <div class="flex justify-center pt-3 w-full">
                    <div class="text-center w-2/3">
                        <p class="font-serif text-3xl font-bold">Screenbook</p>
                        <p class="font-montserrat"> Welcome, {this.state.firstName}! This is your feed. <br></br> See what movies are popular in the Screenbook community and follow other members to see their journals. Or, get started on your own journal. </p>
                    </div>
                </div>
                <div class="flex justify-center pt-4">
                    <button class="button-color-beige hover:opacity-75 font-montserrat font-semibold text-white py-2 px-4 rounded w-40">+ add entry</button>
                </div>
                <div class="flex w-full justify-center mt-6"> 
                    <div class="w-2/3">
                        <MovieRow />
                    </div>
                </div>
            </React.Fragment>
            
        );
    }
}

export default Feed;