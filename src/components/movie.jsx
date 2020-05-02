import React, { useEffect, useState } from 'react';
import firebase from '../firebaseConfig'

function Movie(props){

    const [coverImage, setCoverImage] = useState('')
    const [dateOfEntry, setDateOfEntry] = useState('')
    const [description, setDescription] = useState('')
    const [name, setName] = useState('')
    const [rating, setRating] = useState('')

    useEffect(() => {
        var userInfo = firebase.database().ref('users');
        userInfo.orderByChild('userName').equalTo(props.username).on("value", (snapshot) => {
            console.log("effect called")
            snapshot.forEach((data) => {
                firebaseCall(data.key, props.movieId);
            });
        });
    }, []);

    function firebaseCall(userId, movieId){
        var userInfo = firebase.database().ref('users/' + userId + '/journals/' + movieId)
        userInfo.on('value', (snapshot) => {
            console.log(snapshot.val())
            setName(snapshot.val().name)
            setCoverImage(snapshot.val().coverImage)
            setDateOfEntry(snapshot.val().dateOfEntry)
            setRating(snapshot.val().rating)
            setDescription(snapshot.val().description)
        })
    }



    return (
        <div class="w-screen text-4xl">
            <p>id: {props.movieId}</p>
            <p>movie name: {name}</p>
            <p>date of entry: {dateOfEntry}</p>
            <p>rating: {rating}</p>
            <p>description: {description}</p>
            <p>cover image url: {coverImage}</p>
        </div>
    );
}

export default Movie;