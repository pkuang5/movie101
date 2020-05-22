import React, { useEffect, useState } from 'react';
import firebase from '../firebaseConfig'
import { useHistory, useLocation } from 'react-router-dom'
import 'font-awesome/css/font-awesome.min.css'
import Noty from 'noty'

function Movie(props){

    const [coverImage, setCoverImage] = useState('')
    const [dateOfEntry, setDateOfEntry] = useState('')
    const [description, setDescription] = useState('')
    const [name, setName] = useState('')
    const [previewRating, setPreviewRating] = useState('')
    const [rating, setRating] = useState('')
    const [images, setImages] = useState([])
    const [displayedImages, setDisplayedImages] = useState([])
    const [firebaseId, setFirebaseId] = useState('')
    const [readOnly, setReadOnly] = useState(true)
    const [edited, setEdited] = useState(false)
    const [editImage, setEditImage] = useState(false)
    const [editedImages, setEditedImages] = useState(false)
    const [localUser, setLocalUser] = useState(false)
    let history = useHistory();
    const location = useLocation();

    useEffect(() => {
        if (location.localUser) setLocalUser(true)
        var userInfo = firebase.database().ref('users').orderByChild('userName').equalTo(props.username);
        userInfo.once("value", (snapshot) => {
            snapshot.forEach((data) => {
                setFirebaseId(data.key)
                var movieEntry = firebase.database().ref('users/' + data.key + '/journals/' + props.movieId)
                movieEntry.once('value').then( (snapshot) => {
                    setName(snapshot.val().name)
                    setCoverImage(snapshot.val().coverImage)
                    setDateOfEntry(snapshot.val().dateOfEntry)
                    setRating(Number(snapshot.val().rating))
                    setPreviewRating(Number(snapshot.val().rating))
                    setDescription(snapshot.val().description)
                    setImages(snapshot.val().images)
                    setDisplayedImages(snapshot.val().images)
                })
            });
        });
    }, [props.movieId, props.username, location.localUser]);

    function getMovieImages() {
        let url = ''.concat('https://api.themoviedb.org/3/', 'movie/' ,props.movieId , '/images', '?api_key=', process.env.REACT_APP_MOVIEDB_API_KEY);
        fetch(url).then(result=>result.json()).then((data)=>{
            let imageList = [];
            for (var i in data.backdrops) {
                let imageUrl = 'https://image.tmdb.org/t/p/w500'+data.backdrops[i].file_path
                if (imageUrl !== 'https://image.tmdb.org/t/p/w500null'){
                    imageList.push(imageUrl)
                }
            }
            setDisplayedImages(imageList)
        })
    }

    function updateRating(updatedRating) {
        setRating(updatedRating)
        setPreviewRating(updatedRating)
        firebase.database().ref('users/' + firebaseId + '/journals/' + props.movieId).update({rating: updatedRating});
        showNotification()
    }

    function showNotification(){
        new Noty({
            type: 'success',
            theme: 'bootstrap-v4',
            layout: 'bottomRight',
            text: 'Your Changes Have Been Saved!',
            timeout: 1000
        }).show()
    }

    function handleDeleteMovie(){
        firebase.database().ref('users/' + firebaseId + '/journals/' + props.movieId).remove()
        history.push("/" + props.username)
    }

    function fiveStar(){
        const stars = []
        for (let i = 0; i < previewRating; i++) {
            stars.push(<i class="fa fa-star fa-2x text-yellow-300 pr-1 cursor-pointer" onMouseOver={() => localUser ? setPreviewRating(i+1): null} onMouseLeave={() => localUser ? setPreviewRating(rating): null} onClick={() => localUser? updateRating(i+1):null}></i>)
        }
        for (let i = previewRating; i < 5; i++) {
            stars.push(<i class="fa fa-star fa-2x text-gray-300 pr-1 cursor-pointer" onMouseOver={() => localUser ? setPreviewRating(i+1): null} onMouseLeave={() => localUser ? setPreviewRating(rating): null} onClick={() => localUser? updateRating(i+1):null}></i>)
        }
        return stars
    }

    return (
        <React.Fragment>
        {/* non-mobile UI */}
        <div class="sm:flex w-screen justify-center mt-3 hidden">
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
                            {localUser ? <i class="fa fa-trash fa-lg hover:text-gray-600 cursor-pointer" onClick={handleDeleteMovie}></i>:null}
                        </div>
                        <div class="flex flex-col bg-gray-100 p-3" style={{height:'19rem'}}>
                            <div class="flex justify-between">
                                <p class="text-md font-semibold mr-2">Review</p>
                            {localUser ?
                                readOnly ? 
                                    <i class="fa fa-pencil fa-sm hover:text-gray-600 cursor-pointer" onClick={() => setReadOnly(false)}></i>
                                    : 
                                    <i class="fa fa-check fa-sm hover:text-gray-600 cursor-pointer" onClick={() => {
                                        setReadOnly(true)
                                        if (edited) {
                                            showNotification()
                                            firebase.database().ref('users/' + firebaseId + '/journals/' + props.movieId).update({description: description})
                                        }
                                    }}></i> 
                                : null
                            }
                            </div>
                            <textarea type = "textarea" 
                            onChange={(e) => {
                                setDescription(e.target.value)
                                setEdited(true)
                            }}
                            class={readOnly ? "p-2 text-sm w-full h-full bg-gray-100 outline-none resize-none": "p-2 text-sm w-full h-full bg-white-100 resize-none"} 
                            defaultValue={description} readOnly={readOnly}/>
                        </div>
                    </div>
                </div>
                <div class = "flex flex-col w-full my-5 font-montserrat bg-gray-100 p-8">
                    <div class="flex justify-between">
                        <p class = "text-xl font-semibold mb-4">Images</p>
                        {
                            localUser ?
                                editImage ?
                                    <i class="fa fa-check fa-sm hover:text-gray-600 cursor-pointer" onClick={() => {
                                        if (displayedImages !== images) {
                                            setEditImage(false)
                                            setDisplayedImages(images)
                                            if (editedImages){
                                                showNotification()
                                                firebase.database().ref('users/' + firebaseId + '/journals/' + props.movieId).update({images: images})
                                                setEditedImages(false)
                                            }
                                        }
                                    }}></i>
                                :
                                    <i class="fa fa-pencil fa-sm hover:text-gray-600 cursor-pointer" onClick={() => {getMovieImages(); setEditImage(true);}}></i>
                            :
                            null
                        }
                    </div>
                    <div class="w-full grid grid-cols-3 gap-8">
                        {displayedImages ? displayedImages.map(image => 
                            <img src={image} alt="movie still" class={images && images.includes(image) && editImage ? "cursor-pointer border-yellow-400 border-solid border-4" : "cursor-pointer"} 
                            onClick={() => {
                                if (!images) setImages([image])
                                if (images.includes(image)) setImages(images.filter(url => url !== image))
                                else if (!images.includes(image)) setImages([...images,image])
                                setEditedImages(true)
                            }}/>
                        ): null}
                    </div>
                </div>
            </div>
        </div>

        {/* mobile UI */}
        <div class="flex flex-col items-center w-screen p-6 font-montserrat sm:hidden">
            <div class="flex w-full justify-between">
                <p class="text-sm">{dateOfEntry}</p>
                {localUser ? <i class="fa fa-trash fa-lg hover:text-gray-600 cursor-pointer" onClick={handleDeleteMovie}></i>:null}
            </div>
            <p class="text-3xl text-center font-semibold my-2">{name}</p>
            <img class="w-2/3"src={coverImage} alt="poster"></img>
            <div class="my-3">
                {fiveStar()}
            </div>
            <div class="flex flex-col w-full my-3" style={{height:'19rem'}}>
                <div class="flex justify-between">
                    <p class="text-xl font-semibold">Review</p>
                {localUser ?
                    readOnly ? 
                        <i class="fa fa-pencil fa-sm hover:text-gray-600 cursor-pointer" onClick={() => setReadOnly(false)}></i>
                        : 
                        <i class="fa fa-check fa-sm hover:text-gray-600 cursor-pointer" onClick={() => {
                            setReadOnly(true)
                            if (edited) {
                                showNotification()
                                firebase.database().ref('users/' + firebaseId + '/journals/' + props.movieId).update({description: description})
                            }
                        }}></i> 
                    : null
                }
                </div>
                <textarea type = "textarea" 
                onChange={(e) => {
                    setDescription(e.target.value)
                    setEdited(true)
                }}
                class={readOnly ? "p-2 text-sm w-full h-full outline-none resize-none": "p-2 text-sm w-full h-full bg-gray-100 resize-none"} 
                defaultValue={description} readOnly={readOnly}/>
            </div>
            <div class = "flex flex-col w-full my-3">
                    <div class="flex justify-between">
                        <p class = "text-xl font-semibold mb-4">Images</p>
                        {
                            localUser ?
                                editImage ?
                                    <i class="fa fa-check fa-sm hover:text-gray-600 cursor-pointer" onClick={() => {
                                        if (displayedImages !== images) {
                                            setEditImage(false)
                                            setDisplayedImages(images)
                                            if (editedImages){
                                                showNotification()
                                                firebase.database().ref('users/' + firebaseId + '/journals/' + props.movieId).update({images: images})
                                                setEditedImages(false)
                                            }
                                        }
                                    }}></i>
                                :
                                    <i class="fa fa-pencil fa-sm hover:text-gray-600 cursor-pointer" onClick={() => {getMovieImages(); setEditImage(true);}}></i>
                            :
                            null
                        }
                    </div>
                    <div class="w-full grid grid-cols-1 gap-3">
                        {displayedImages ? displayedImages.map(image => 
                            <img src={image} alt="movie still" class={images && images.includes(image) && editImage ? "cursor-pointer border-yellow-400 border-solid border-4" : "cursor-pointer"} 
                            onClick={() => {
                                if (!images) setImages([image])
                                if (images.includes(image)) setImages(images.filter(url => url !== image))
                                else if (!images.includes(image)) setImages([...images,image])
                                setEditedImages(true)
                            }}/>
                        ): null}
                    </div>
                </div>
        </div>
        </React.Fragment>
    );
}

export default Movie;