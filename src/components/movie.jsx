import React, { useEffect, useState } from 'react';
import firebase from '../firebaseConfig'
import { useHistory } from 'react-router-dom'
import 'font-awesome/css/font-awesome.min.css'

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

    const stars = []
    for (let i = 0; i < rating; i++) {
        stars.push(<i class="fa fa-star fa-2x text-yellow-300 mr-1"></i>)
    }
    for (let i = 0; i < 5-rating; i++) {
        stars.push(<i class="fa fa-star fa-2x text-gray-300 mr-1"></i>)
    }


    return (
        <div class="flex w-screen justify-center mt-3">
            <div class = "w-2/3">
                <div class="flex justify-between font-montserrat">
                    <p class="text-3xl font-semibold">{name}</p>
                    <p class="text-xl">{dateOfEntry}</p>
                </div>
                <div class="flex">
                    <div class = "w-1/4">
                        <img src={coverImage} alt="poster"></img>
                    </div>
                    <div class = "flex flex-col justify-between w-3/4 pl-5 font-montserrat">
                        <div class="flex w-full justify-between items-center">
                            <div>{stars}</div>
                            <div>
                                <button class="button-color-beige h-8 w-24 text-white px-3 mr-3" onClick={handleEditMovie}>Edit</button>
                                <button class="bg-red-400 h-8 w-24 text-white px-3" onClick={handleDeleteMovie}>Delete</button>
                            </div>
                        </div>
                        <div class="bg-gray-100 p-3 h-64 overflow-auto">
                            <p class="text-md font-semibold">Review</p>
                            <p class="text-sm">{description}</p>
                        </div>
                    </div>
                </div>
                <div class = "w-full my-5 font-montserrat bg-gray-100 p-8">
                    <div class = "w-full text-xl font-semibold mb-4">Images</div>
                    <div class="w-full grid grid-cols-3 gap-8">
                        {images ? images.map(image => 
                            <img src={image} alt="movie still" />
                        ): null}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Movie;