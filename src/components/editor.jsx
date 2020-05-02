import React from 'react';
import firebase from '../firebaseConfig'

function Editor(props) {

    //sample firebase function to create movie entry
    function sendSampleMovieEntry() {
        let movieID = Math.floor(Math.random() * 10000)
        firebase.database().ref('users/' + props.googleId + '/journals/' + movieID).set({
            name: 'sample name',
            coverImage: 'https://ih1.redbubble.net/image.1070926604.0419/flat,750x1000,075,f.jpg',
            dateOfEntry: '04-20-2020',
            rating: '10/10',
            description: 'great movie'
        })
    }

    return(
        <button class="bg-blue-400" onClick={sendSampleMovieEntry}>click to add entry</button>
    );

}

export default Editor;