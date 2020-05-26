import React, { useState, useEffect } from 'react'
import firebase from '../firebaseConfig'
import Noty from 'noty'
import 'noty/lib/noty.css'
import 'noty/lib/themes/bootstrap-v4.css'
import 'font-awesome/css/font-awesome.min.css'
import Switch from "react-switch";
import { useHistory, useLocation, useRef } from 'react-router-dom'
import DropSearch from './dropSearch'

require('dotenv').config()

function Editor(props) {

    const [movieName, setMovieName] = useState('')
    const [movieRating, setMovieRating] = useState('5')
    const [movieReview, setMovieReview] = useState('')
    const [movieYear, setMovieYear] = useState('')
    const [movieId, setMovieId] = useState('')
    const [movieImage, setMovieImage] = useState('')
    const [change, setChange] = useState(false)
    const [featured, setFeatured] = useState(true)
    const [specificImages, setSpecificImages] = useState([])
    const [imagesToStore, setImagesToStore] = useState([])
    const [checked, setChecked] = useState(true)
    const [previewRating, setPreviewRating] = useState(5)
    const [presentDay, setPresentDay] = useState('')
    const [searched, setSearched] = useState(false)
    const [show, setShow] = useState(true)

    let location = useLocation()
    let history = useHistory()


    useEffect(() => {
        setPresentDay(getCurrentDate('/'))
        if (location.movieId) {
            setMovieId(location.movieId)
            setMovieName(location.title)
            getMovieInfo(location.title, location.movieId)
            getMovieImage(location.movieId)
            setChange(true)
        }
    }, [location.movieId], [location.title])

    function fiveStar() {
        const stars = []
        for (let i = 0; i < previewRating; i++) {
            stars.push(<i class="fa fa-star fa-2x text-blue-300 pr-1 cursor-pointer" onMouseOver={() => setPreviewRating((i + 1))} onMouseLeave={() => setPreviewRating((movieRating))} onClick={() => {
                setMovieRating(i + 1)
                setPreviewRating(i + 1)
                setChange(true)
            }}></i>)
        }
        for (let i = previewRating; i < 5; i++) {
            stars.push(<i class="fa fa-star fa-2x text-gray-300 pr-1 cursor-pointer" onMouseOver={() => setPreviewRating((i + 1))} onMouseLeave={() => setPreviewRating((movieRating))} onClick={() => {
                setMovieRating(i + 1)
                setPreviewRating(i + 1)
                setChange(true)
            }} ></i>)
        }
        return stars
    }
    function showNotification() {
        new Noty({
            type: 'success',
            theme: 'bootstrap-v4',
            layout: 'bottomRight',
            text: 'You Changes Have Been Saved!',
            timeout: 3000
        }).show()
    }
    function showImage() {
        new Noty({
            type: 'success',
            theme: 'bootstrap-v4',
            layout: 'bottomRight',
            text: 'Image has been selected!',
            timeout: 3000
        }).show()
    }
    function getCurrentDate(separator = '') {

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        return `${month < 10 ? `0${month}` : `${month}`}${separator}${date}${separator}${year}`

    }
    function getMovieInfo(title, id) {
        setShow(true)
        let flag = false
        let def = ''
        let defID = ''
        setSearched(true)
        setImagesToStore([])
        setSpecificImages([])
        let url = ''.concat('https://api.themoviedb.org/3/', 'search/movie?api_key=', process.env.REACT_APP_MOVIEDB_API_KEY, '&query=', title);
        fetch(url).then(result => result.json()).then((data) => {
            var i
            for (i in data.results) {
                def = data.results[0].poster_path
                defID = data.results[0].id
                let movieEntry = {
                    image: ('https://image.tmdb.org/t/p/w500' + data.results[i].poster_path),
                    title: data.results[i].title,
                    id: data.results[i].id
                }
                if (movieEntry.id === id && movieEntry.image === 'https://image.tmdb.org/t/p/w500null') {

                    setMovieImage("http://pngimg.com/uploads/mario/mario_PNG53.png")
                    setMovieId(movieEntry.id)
                }
                else if (movieEntry.id === id) {
                    setMovieName(movieEntry.title)
                    setMovieImage(movieEntry.image)
                    setMovieId(movieEntry.id)
                    getMovieImage(movieEntry.id)
                    flag = true
                }
            }
            if (flag === false) {

                setMovieImage('https://image.tmdb.org/t/p/w500' + def)
                setMovieId(defID)
                getMovieImage(defID)
            }
        })
    }
    function getMovieImage(i, n) {
        setSpecificImages([])
        let url = ''.concat('https://api.themoviedb.org/3/', 'movie/', i, '/images', '?api_key=', process.env.REACT_APP_MOVIEDB_API_KEY, '&query=', movieName);
        fetch(url).then(result => result.json()).then((data) => {
            let imageList = []
            var i
            for (i in data.backdrops) {
                let movieImageEntry = {
                    image: ('https://image.tmdb.org/t/p/w500' + data.backdrops[i].file_path),
                }
                if (movieImageEntry.image !== 'https://image.tmdb.org/t/p/w500null') {
                    imageList.push(movieImageEntry)
                }
            }
            setSpecificImages(imageList)
        })
    }
    function handleSubmit() {
        if (change) {
            showNotification()
            firebase.database().ref(`users/${props.googleId}/journals/${movieId}`).set({
                name: movieName,
                coverImage: movieImage,
                dateOfEntry: presentDay,
                rating: movieRating,
                description: movieReview,
                featured: featured,
                images: imagesToStore,
                movieYear: movieYear
            })
        }
        setMovieRating('5')
        history.push(props.username + '/movies/' + movieId)
    }
    function handleSpecificImgClick(e) {
        if (imagesToStore.includes(e)) {
            setImagesToStore(imagesToStore.filter(url => url !== e))
        }
        else {
            setImagesToStore([...imagesToStore, e])
        }
    }
    return (
        <div class="flex flex-col font-montserrat w-screen items-center mt-3">
            <div class="w-2/3">
                <div class={show ? "hidden" : "border-b border-b-2 border-gray-400"}>
                    <p class="pb-4 text-2xl">Editor</p>
                    <div class="flex w-full border-b border-b-2 border-gray-400 justify-between">
                        <DropSearch getMovieInfo={(name, id) => getMovieInfo(name, id)} onChange={(e) => {
                            setMovieName(e.target.value)
                            setChange(true)
                        }}
                            onChange2={(e, date) => {
                                setMovieName(e)
                                setChange(true)
                                setMovieYear(date)
                            }}
                            name={movieName} show={show}>
                        </DropSearch>
                        <svg onClick={() => change ? getMovieInfo(movieName) : null} class="cursor-pointer" width="30" height="30" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" />
                            <circle cx="20.5" cy="17.5" r="10.5" stroke="black" stroke-width="2" />
                            <line x1="28.1584" y1="25.244" x2="37.256" y2="34.3417" stroke="black" stroke-width="2" stroke-linecap="round" />
                        </svg>
                    </div>
                </div>
                <div class={show ? null : "hidden"}>
                    <div class="flex w-full mb-12">
                        <div class="w-1/2 h-auto">
                            <div class="w-full h-full">
                                <p class="text-3xl font-bold pb-4 ">Editor</p>
                                <p>Film Title</p>
                                <div class="flex w-full border-b border-b-2 border-gray-400 justify-between">
                                    <DropSearch getMovieInfo={(name, id) => getMovieInfo(name, id)} onChange={(e) => {
                                        setMovieName(e.target.value)
                                        setChange(true)
                                    }}
                                        onChange2={(e, date) => {
                                            setMovieName(e)
                                            setChange(true)
                                            setMovieYear(date)
                                        }}
                                        name={movieName} show={show}>
                                    </DropSearch>
                                    <svg onClick={() => change ? getMovieInfo(movieName) : null} class="cursor-pointer" width="30" height="30" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" />
                                        <circle cx="20.5" cy="17.5" r="10.5" stroke="black" stroke-width="2" />
                                        <line x1="28.1584" y1="25.244" x2="37.256" y2="34.3417" stroke="black" stroke-width="2" stroke-linecap="round" />
                                    </svg>
                                </div>
                                <div class={show ? "mt-8 sm:w-full w-screen h-full items-center" : "hidden"}>
                                    <p>Review</p>
                                    <textarea type="textarea"
                                        onChange={(e) => {
                                            setMovieReview(e.target.value)
                                            setChange(true)
                                        }}
                                        class="outline-none resize-none whitespace-normal flex-no-wrap text-sm border-2 border-gray-400 px-2 w-4/5 sm:w-full h-64" placeholder="Description" />
                                    <div class=" pt-4 ml-16 sm:ml-0">{fiveStar()}</div>
                                </div>
                            </div>
                        </div>
                        <div class={show ? "flex w-1/2 justify-center items-center" : "hidden"}>
                            <img class="w-1/2" src={movieImage} />
                        </div>
                    </div>
                    <div class={show ? "w-full" : "hidden"}>
                        <div class={searched === false ? null : "flex p-4 bg-gray-200 h-auto w-full"}>
                            <div class="h-32  sm:h-auto overflow-auto justify-between grid grid-cols-3 gap-2 sm:gap-8 cursor-pointer ">
                                {specificImages.map(movieImageEntry =>
                                    <img src={movieImageEntry.image} class={imagesToStore.includes(movieImageEntry.image) ? "border-blue-400 border-solid border-4" : "hover:opacity-75 transition ease-in-out duration-200 transform hover:-translate-y-1 hover:scale-105"} onClick={() => handleSpecificImgClick(movieImageEntry.image)}></img>
                                )}
                            </div>
                        </div>
                        <div class="flex items-end w-full my-4">
                            <button onClick={change ? () => handleSubmit() : null} class="w-1/2 rounded-full hover:opacity-75 text-sm bg-gray-200 h-12" type="button">
                                Submit
                            </button>
                            <div class="flex w-1/2 justify-center">
                                <label>
                                    <p class="sm:pl-2">Featured?</p>
                                    <div class="sm:px-2">
                                        <Switch onChange={() => {
                                            setChecked(!checked)
                                            setFeatured(!featured)
                                        }} checked={checked} onColor="#1E90FF" height={36} width={88} />
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default Editor;

