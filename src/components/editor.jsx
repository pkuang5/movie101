import React, { useState, useEffect } from 'react'
import firebase from '../firebaseConfig'
import Noty from 'noty'
import 'noty/lib/noty.css'
import 'noty/lib/themes/bootstrap-v4.css'
import 'font-awesome/css/font-awesome.min.css'
import Switch from "react-switch";
import { useHistory,useLocation, useRef } from 'react-router-dom'
import DropSearch from './dropSearch'

require('dotenv').config()

function Editor (props) {
  
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
   
   let location = useLocation()
   let history = useHistory()

  
   useEffect(() => {
        setPresentDay(getCurrentDate('/'))
        if (location.movieId) {
            setMovieId(location.movieId)
            setMovieName(location.title)
            getMovieInfo(location.title,location.movieId)
            getMovieImage(location.movieId)
            setChange(true)
        }
    },[location.movieId],[location.title])
  
   function fiveStar () {
        const stars = []
        for (let i = 0; i < previewRating; i++) {
            stars.push(<i class="fa fa-star fa-2x text-blue-300 pr-1 cursor-pointer" onMouseOver={() => setPreviewRating((i+1))} onMouseLeave={() => setPreviewRating((movieRating))} onClick={()=> {
                setMovieRating(i+1) 
                setPreviewRating(i+1) 
                setChange(true)}}></i>)
        }
        for (let i = previewRating; i < 5; i++) {
            stars.push(<i class="fa fa-star fa-2x text-gray-300 pr-1 cursor-pointer" onMouseOver={() => setPreviewRating((i+1))} onMouseLeave={() => setPreviewRating((movieRating))} onClick={() => {
                setMovieRating(i+1)
                setPreviewRating(i+1)
                setChange(true)}} ></i>)
        }
        return stars
    }
    function showNotification () {
        new Noty({
            type: 'success',
            theme: 'bootstrap-v4',
            layout: 'bottomRight',
            text: 'You Changes Have Been Saved!',
            timeout: 3000
        }).show()
    }
    function showImage () {
      new Noty({
          type: 'success',
          theme: 'bootstrap-v4',
          layout: 'bottomRight',
          text: 'Image has been selected!',
          timeout: 3000
      }).show()
    } 
    function getCurrentDate (separator='') {

      let newDate = new Date()
      let date = newDate.getDate();
      let month = newDate.getMonth() + 1;
      let year = newDate.getFullYear();
      
      return `${month<10?`0${month}`:`${month}`}${separator}${date}${separator}${year}`

    }
    function getMovieInfo (title, id) {
   
        let flag = false
        setSearched(true)
        setImagesToStore([])
        setSpecificImages([])
        let url = ''.concat('https://api.themoviedb.org/3/', 'search/movie?api_key=', process.env.REACT_APP_MOVIEDB_API_KEY, '&query=', title);
        fetch(url).then(result=>result.json()).then((data)=>{
                var i
                for (i in data.results) {
                  let movieEntry = {
                    image: ('https://image.tmdb.org/t/p/w500'+data.results[i].poster_path),
                    title: data.results[i].title,
                    id: data.results[i].id
                  }
                  if (movieEntry.id === id && movieEntry.image === 'https://image.tmdb.org/t/p/w500null'){
    
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
    
                  setMovieImage('https://image.tmdb.org/t/p/w500'+data.results[0].poster_path)
                  setMovieId(data.results[0].id)
                  getMovieImage(data.results[0].id)
                }
        })
    }
    function getMovieImage (i, n) {
      setSpecificImages([])
      let url = ''.concat('https://api.themoviedb.org/3/', 'movie/' ,i , '/images', '?api_key=', process.env.REACT_APP_MOVIEDB_API_KEY, '&query=', movieName);
      fetch(url).then(result=>result.json()).then((data)=>{
        let imageList = []
              var i
              for (i in data.backdrops) {
                let movieImageEntry = {
                  image: ('https://image.tmdb.org/t/p/w500'+data.backdrops[i].file_path),
                }
                if (movieImageEntry.image !== 'https://image.tmdb.org/t/p/w500null'){
                  imageList.push(movieImageEntry)
                }
            }  
              setSpecificImages(imageList)
        })
    }
    function handleSubmit () {
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
    function handleSpecificImgClick (e) {
      let arr = imagesToStore
      if (imagesToStore.includes(e)) {
        var index = arr.indexOf(e)
        const temp = arr.slice(0,index).concat(arr.slice(index+1, arr.length))
        arr = temp
        setImagesToStore(arr)
      }
      else {
        arr = imagesToStore
        arr.push(e)
        setImagesToStore(arr)
      }
    }
    return (
        <div class="flex flex-col font-montserrat w-screen items-center mt-3">
            <div class = "w-2/3  items-center">
                <div class = "grid grid-row-2 ">
                    <div class = "grid grid-cols-2 h-64 mb-12">
                        <div class = "w-full h-full ">
                            <p class="font-serif text-3xl font-bold pb-4 ">Editor</p>
                            <div class = "grid grid-cols-2 gap-2 ">  
                            <div class = "w-64 border-b border-b-2 border-teal-300">
                                <p>Title</p>
                                <DropSearch getMovieInfo = {(name,id)=>getMovieInfo(name,id)} onChange = {(e) => {
                                    setMovieName(e.target.value)
                                    setChange(true)
                                }}  
                                onChange2 = {(e, date) => {
                                    setMovieName(e)
                                    setChange(true)
                                    setMovieYear(date)
                                }}
                                name = {movieName}>
                                </DropSearch> 
                            </div>
                                <div class = "w-8 h-4 pt-12 pl-4">
                                    <svg onClick = {() => getMovieInfo(movieName)} class = "cursor-pointer" width="30" height="30" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" />
                                    <circle cx="20.5" cy="17.5" r="10.5" stroke="black" stroke-width="2" />
                                    <line x1="28.1584" y1="25.244" x2="37.256" y2="34.3417" stroke="black" stroke-width="2" stroke-linecap="round" />
                                    </svg>
                                </div>
                            </div>
                            <div class = "pt-8 mt-8 w-full h-full items-center">
                                <p >Review</p>
                                <textarea type = "textarea" 
                                onChange = {(e) => {
                                    setMovieReview(e.target.value) 
                                    setChange(true)
                                    }} 
                                    class="resize-none whitespace-normal flex-no-wrap text-sm border-2 border-teal-200 px-2  w-full h-64" placeholder="Description"/>
                                <div class = " pt-4 ">{fiveStar()}</div>
                            </div>
                            </div>
                            <div class = "h-full w-full pt-12 ">
                                <div class = " ml-24 h-full w-4/5 border-2 border-teal-200 border-2 bg-cover" style={{backgroundImage: "url('" + movieImage + "')"}}/>
                            </div>
                        </div>
                        <div class = "w-full h-0 mt-64 bg-green-200 " >    
                            <div class =  {searched === false ? "flex text-sm border-solid border-2 border-teal-200  p-2 bg-gray-200 mt-16 h-auto w-full" : "flex text-sm border-solid border-2 border-teal-200  p-8 bg-gray-200 mt-16 h-auto w-full"}>
                                <div class="overflow-auto justify-between grid grid-cols-3 gap-8 cursor-pointer ">
                                    {specificImages.map(movieImageEntry =>    
                                        <img src={movieImageEntry.image} class={imagesToStore.includes(movieImageEntry.image) ? "border-blue-400 border-solid border-4" : "hover:opacity-75 transition ease-in-out duration-200 transform hover:-translate-y-1 hover:scale-105" } onClick = {() => handleSpecificImgClick(movieImageEntry.image)}></img>
                                    )}
                                </div>
                            </div>
                            <div class = "flex grid grid-cols-3 pl-8 items-end ml-20 w-4/5 pt-2 pb-2">
                                <div class = "">
                                    <p class = "pt-2 pl-12">Date</p>
                                    <input onChange = {(e) => setPresentDay(e.taget.value), ()=>setChange(true)} class= "w-3/5 h-12 text-lg  py-2 px-4 border-b border-b-2 border-teal-300"  type="text" placeholder={presentDay}/>
                                </div>
                            <button onClick ={change? ()=>handleSubmit() :null} class= "hover:opacity-75 text-sm border-2 border-teal-200  py-2 px-4 w-11/12  h-12" type="button">
                                Submit
                            </button>
                            <div class = "w-full items-center ml-16 ">
                                <label>
                                    <p class = "pl-2 ">Featured?</p>
                                    <div class = " px-2">
                                        <Switch onChange={()=>{
                                            setChecked(!checked)
                                            setFeatured(!featured)
                                            }} checked={checked} onColor = "#1E90FF" height = {36} width = {88}/>
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

