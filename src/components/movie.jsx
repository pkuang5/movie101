import React, { useEffect, useState } from 'react';
import firebase from '../firebaseConfig'
import { useHistory } from 'react-router-dom'

function Movie(props){

    const [coverImage, setCoverImage] = useState('')
    const [dateOfEntry, setDateOfEntry] = useState('')
    const [description, setDescription] = useState('')
    const [name, setName] = useState('')
    const [rating, setRating] = useState('')
    const [images, setImages] = useState([])
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
                    setImages(snapshot.val().images)
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
        <div class="flex w-screen justify-center mt-3">
            <div class = "w-2/3">
                <div class="flex justify-between font-montserrat">
                    <p class="text-3xl font-semibold">{name}</p>
                    <p class="text-xl">{dateOfEntry}</p>
                </div>
                <div class="flex">
                    <div class = "w-1/4 h-24">
                        <img src={coverImage}></img>
                        <p class="mt-3 font-montserrat text-lg text-center">{'Rating: ' + rating + '/5'}</p>
                        <div class="flex justify-between">
                            <button class="button-color-beige w-24 text-white px-3" onClick={handleEditMovie}>Edit</button>
                            <button class="bg-red-400 w-24 text-white px-3" onClick={handleDeleteMovie}>Delete</button>
                        </div>
                    </div>
                    <div class = "w-3/4 pl-5 font-montserrat">
                        <div class="bg-gray-100 p-3 h-64 overflow-auto">
                            <p class="text-md font-semibold">Review</p>
                            <p class="text-sm">{description}</p>
                        </div>
                        <div class = "mt-3 p-3 h-64 bg-gray-100 overflow-auto">
                            <div class = "text-md font-semibold mb-2">Images</div>
                            <div class="grid grid-cols-2 gap-4">
                                {images.map(image => 
                                    <img src={image} alt="movie still" />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Movie;