import React, { useState, useEffect } from 'react';
import Card from './card'
import firebase from '../firebaseConfig'


function Gallery(props) {

    const [movies, setMovies] = useState([])

    useEffect(() => {
        var userInfo = firebase.database().ref('users/' + props.googleId + '/journals')
        userInfo.on('value', (snapshot) => {
            snapshot.forEach((data) => {
                let movie = {
                    id: data.key,
                    name: data.val().name,
                    coverImageURL: data.val().coverImage
                }
                setMovies(movies.concat(movie));
            });
        })
    });

    return (
        <div class="grid grid-cols-3 gap-20 grid-rows-2">
            {movies.map(movieEntry => <Card imageUrl={movieEntry.coverImageURL} movieName={movieEntry.name} />)}
        </div>
    );

}

export default Gallery;