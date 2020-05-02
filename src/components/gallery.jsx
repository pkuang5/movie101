import React, { useState, useEffect } from 'react';
import firebase from '../firebaseConfig'
import { useHistory } from 'react-router-dom'


function Gallery(props) {

    const [movies, setMovies] = useState([])
    let history = useHistory();

    useEffect(() => {
        if (props.googleId){
            firebaseCall();
        }
    }, [props.googleId]);

    function firebaseCall() {
        var userInfo = firebase.database().ref('users/' + props.googleId + '/journals')
        userInfo.on('value', (snapshot) => {
            let temp = [];
            snapshot.forEach((data) => {
                let movie = {
                    id: data.key,
                    name: data.val().name,
                    coverImageURL: data.val().coverImage
                }
                temp.push(movie);
            });
            setMovies(movies.concat(temp));
        })
    }

    function handleMovieClick(id) {
        history.push("/" + props.username + "/movies/" + id);
    }

    return (
        <div class="grid grid-cols-4 col-gap-20 row-gap-10 grid-rows-2">
            {movies.map(movieEntry =>
                <div class="flex flex-col cursor-pointer justify-center" onClick={() => handleMovieClick(movieEntry.id)}>
                    <img class="w-full" src={movieEntry.coverImageURL} alt={movieEntry.name} />
                    <p class="w-full text-center text-sm font-montserrat select-none">{movieEntry.name}</p>
                </div>
            )}
        </div>
    );

}

export default Gallery;