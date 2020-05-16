import React, { useEffect, useState } from 'react';
import firebase from '../firebaseConfig'
import { useHistory } from 'react-router-dom'

function Movie(props){

    const [coverImage, setCoverImage] = useState('')
    const [dateOfEntry, setDateOfEntry] = useState('')
    const [description, setDescription] = useState('')
    const [name, setName] = useState('')
    const [rating, setRating] = useState('')
    const [firebaseId, setFirebaseId] = useState('')
    let history = useHistory();

    useEffect(() => {
        var userInfo = firebase.database().ref('users').orderByChild('userName').equalTo(props.username);
        userInfo.once("value", (snapshot) => {
            snapshot.forEach((data) => {
                setFirebaseId(data.key)
                var movieEntry = firebase.database().ref('users/' + data.key + '/journals/' + props.movieId)
                movieEntry.once('value').then( (snapshot) => {
                    setName(snapshot.val().name)
                    setCoverImage(snapshot.val().coverImage)
                    setDateOfEntry(snapshot.val().dateOfEntry)
                    setRating(snapshot.val().rating)
                    setDescription(snapshot.val().description)
                })
            });
        });
    }, [props.movieId, props.username]);

    function handleDeleteMovie(){
        firebase.database().ref('users/' + firebaseId + '/journals/' + props.movieId).remove()
        history.push("/" + props.username)
    }

    function handleEditMovie(){
        history.push('/Editor', props.movieId)
        console.log(props.movieId)
    }

    return (
        <div class="w-screen text-4xl">
            <p>id: {props.movieId}</p>
            <p>movie name: {name}</p>
            <p>date of entry: {dateOfEntry}</p>
            <p>rating: {rating}</p>
            <p>description: {description}</p>
            <p>cover image url: {coverImage}</p>
            <button class="bg-red-500 text-white px-3" onClick={handleDeleteMovie}>Delete movie</button>
            <button class="bg-blue-500 text-white px-3" onClick={handleEditMovie}>Edit movie</button>
        </div>
    );
}

export default Movie;