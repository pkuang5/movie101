import React, { useEffect, useState } from 'react';
import firebase from '../firebaseConfig'
import { useHistory } from 'react-router-dom'
import 'font-awesome/css/font-awesome.min.css'

function Movie(props){

    const [coverImage, setCoverImage] = useState('')
    const [dateOfEntry, setDateOfEntry] = useState('')
    const [description, setDescription] = useState('')
    const [name, setName] = useState('')
    const [previewRating, setPreviewRating] = useState('')
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
        setPreviewRating(rating)
    }, [props.movieId, props.username]);

    useEffect(() => {
        console.log("new rating " + rating)
        setPreviewRating(rating)
    }, [rating])

    function handleDeleteMovie(){
        firebase.database().ref('users/' + firebaseId + '/journals/' + props.movieId).remove()
        history.push("/" + props.username)
    }

    function handleEditMovie(){
        history.push('/Editor', props.movieId)
    }

    function fiveStar(){
        const stars = []
        for (let i = 0; i < previewRating; i++) {
            stars.push(<i class="fa fa-star fa-2x text-yellow-300 pr-1 cursor-pointer" onMouseOver={() => setPreviewRating(i+1)} onMouseLeave={() => setPreviewRating(rating)} onClick={() => setRating(i+1)}></i>)
        }
        for (let i = previewRating; i < 5; i++) {
            stars.push(<i class="fa fa-star fa-2x text-gray-300 pr-1 cursor-pointer" onMouseOver={() => setPreviewRating(i+1)} onMouseLeave={() => setPreviewRating(rating)} onClick={() => setRating(i+1)}></i>)
        }
        return stars
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
                            <div>{fiveStar()}</div>
                            <div>
                                <i class="fa fa-edit fa-lg hover:text-gray-600 cursor-pointer mr-3" onClick={handleEditMovie}></i>
                                <i class="fa fa-trash fa-lg hover:text-gray-600 cursor-pointer" onClick={handleDeleteMovie}></i>
                            </div>
                        </div>
                        <div class="bg-gray-100 p-3 overflow-auto" style={{height:'19rem'}}>
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