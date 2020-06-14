import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import YouTube from 'react-youtube';
import firebase from '../firebaseConfig'
import Noty from 'noty'

function Film(props) {

    const [videoIds, setVideoIds] = useState([])
    const [details, setDetails] = useState([])
    const [images, setImages] = useState([])
    const [credits, setCredits] = useState([])
    const [infoDisplay, setInfoDisplay] = useState(true)
    const [imageDisplay, setImageDisplay] = useState(false)
    const [videoDisplay, setVideoDisplay] = useState(false)
    const [castDisplay, setCastDisplay] = useState(false)
    const [watchlist, setWatchlist] = useState(false)
    const [journal, setJournals] = useState(false)
    let history = useHistory();


    useEffect(() => {
        callApi(props.movieId, '/videos', setVideoIds)
        callApi(props.movieId, '', setDetails)
        callApi(props.movieId, '/images', setImages)
        callApi(props.movieId, '/credits', setCredits)
    }, [props.movieId])

    function callApi(movieId, parameter, callback) {
        let url = ''.concat('https://api.themoviedb.org/3/movie/', movieId , parameter ,'?api_key=',process.env.REACT_APP_MOVIEDB_API_KEY)
        fetch(url).then(result=>result.json()).then((data)=>{
            if (parameter === '/images') {
                let imageList = [];
                for (var i in data.backdrops) {
                    let imageUrl = 'https://image.tmdb.org/t/p/w500'+data.backdrops[i].file_path
                    if (imageUrl !== 'https://image.tmdb.org/t/p/w500null'){
                        imageList.push(imageUrl)
                    }
                }
                callback(imageList)
            }
            else if (data.results) callback(data.results)
            else callback(data)
        })
    }

    function _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }

    // const opts = {
    //     height: '150',
    //     width: '300',
    //     playerVars: {
    //       // https://developers.google.com/youtube/player_parameters
    //       autoplay: 0,
    //     },
    // };

    function getCrewInfo(parameter) {
        for (var i in credits.crew) {
            if (credits.crew[i].job === parameter) return credits.crew[i].name;
        }
    }

    function addToWatchlist(movieId, posterImage, movieTitle) {
        firebase.database().ref(`users/${props.id}/watchlist/${movieId}`).set({
            image: posterImage,
            title: movieTitle
        })
        showNotification()
    }

    function showNotification(){
        new Noty({
            type: 'success',
            theme: 'bootstrap-v4',
            layout: 'bottomRight',
            text: 'Movie has been added to watchlist!',
            timeout: 1000
        }).show()
    }

    return (
        //mobile
        <div class='flex w-screen justify-center'>
            <div class="flex flex-col w-full sm:w-2/3 items-center p-3">
                <p class="font-montserrat text-center text-2xl sm:text-5xl font-semibold">{details.title}</p>
            
                <div class="flex w-full text-lg font-bold  font-montserrat justify-around select-none py-2 bg-brown2 rounded-sm "> 
                    <div class={infoDisplay ? 'border-b-2 border-white cursor-pointer':'cursor-pointer'} onClick={() => {setInfoDisplay(true); setVideoDisplay(false); setCastDisplay(false); setImageDisplay(false)}}>Info</div>
                    <div class={imageDisplay ? 'border-b-2 border-white cursor-pointer':'cursor-pointer'} onClick={() => {setInfoDisplay(false); setVideoDisplay(false); setCastDisplay(false); setImageDisplay(true)}}>Images</div>
                    <div class={videoDisplay ? 'border-b-2 bborder-white cursor-pointer':'cursor-pointer'} onClick={() => {setInfoDisplay(false); setVideoDisplay(true); setCastDisplay(false); setImageDisplay(false)}}>Videos</div>
                    <div class={castDisplay ? ' border-b-2 border-white cursor-pointer':'cursor-pointer'} onClick={() => {setInfoDisplay(false); setVideoDisplay(false); setCastDisplay(true); setImageDisplay(false)}}>Cast</div>
                </div>
                <div class="bg-brown1 rounded-sm">
                    <div class={infoDisplay ? "flex flex-col sm:flex-row p-2":"hidden"}>
                        <div class="flex w-1/4 flex-col items-center">
                            <img class="w-3/4 sm:w-full" src={'https://image.tmdb.org/t/p/w500' + details.poster_path} alt="poster" />
                        </div>
                        <div class="flex w-3/4 flex-col font-montserrat text-sm sm:text-lg px-5 justify-between">
                            <p>{'Description: ' + details.overview}</p>
                            <p>{'Director: ' + getCrewInfo('Director')}</p>
                            <p>{'Release Date: ' + details.release_date}</p>
                        </div>
                    </div>
                    {infoDisplay ? 
                    <div class="flex flex-col p-2">

                        <button onClick={() => addToWatchlist(props.movieId, 'https://image.tmdb.org/t/p/w500'+details.poster_path, details.title)} class="transition duration-500 ease-in-out rounded transform hover:-translate-y-1 hover:scale-110 button-color-beige font-montserrat font-semibold text-white py-2 px-4 rounded w-1/4 mb-2">Add to watchlist</button>
                        <button onClick={() => history.push({pathname: '/editor', movieId: props.movieId, title:details.title})} class="transition duration-500 ease-in-out rounded transform hover:-translate-y-1 hover:scale-110 button-color-beige font-montserrat font-semibold text-white py-2 px-4 rounded w-1/4">Add to journals</button>

                    </div>: null
                    }
                    <div class={castDisplay ? "grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 gap-6 p-3":"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-3"}>
                        {videoDisplay ? videoIds.map(video => video.site === "YouTube" ? <div class='flex justify-center'><YouTube className="w-full h-full" videoId={video.key} id={video.id} onReady={_onReady} /></div> : null) : null}
                        {imageDisplay ? images.map(image => <img src={image} alt="movie still" />):null}
                        {castDisplay ? credits.cast.map(member => 
                            member.profile_path ? 
                            <div class="text-center font-montserrat bg-white border rounded-sm">
                                <img src={'https://image.tmdb.org/t/p/w500' + member.profile_path} alt="actor image" />
                                <p class="font-semibold">{member.name}</p>
                                <p class="text-gray-600">{'"' + member.character + '"'}</p>
                            </div>
                            :null  
                        ):null}
                    </div>
                </div>


            </div>
        </div>

    )

}

export default Film