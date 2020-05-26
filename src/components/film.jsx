import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import YouTube from 'react-youtube';

function Film(props) {

    const [videoIds, setVideoIds] = useState([])
    const [details, setDetails] = useState([])
    const [images, setImages] = useState([])
    const [videoDisplay, setVideoDisplay] = useState(false)
    let history = useHistory();


    useEffect(() => {
        callApi(props.movieId, '/videos', setVideoIds)
        callApi(props.movieId, '', setDetails)
        callApi(props.movieId, '/images', setImages)
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

    function handleVideoDisplay(bool) {
        setVideoDisplay(bool)
    }

    const opts = {
        height: '150',
        width: '300',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 0,
        },
    };

    return (
        //mobile
        <div class='flex w-screen justify-center'>
            <div class="flex flex-col w-full sm:w-2/3 items-center p-3">

                <p class="font-montserrat text-center text-2xl sm:text-5xl font-semibold">{details.title}</p>
                <div class="flex flex-col sm:flex-row">
                    <div class="flex flex-col items-center">
                        {/* <i onClick={() => history.push({pathname: '/editor', movieId: props.movieId})} class="fa fa-plus-circle fa-lg"></i> */}
                        <img class="w-3/4 sm:w-full" src={'https://image.tmdb.org/t/p/w500' + details.poster_path} alt="poster" />
                    </div>
                    <div class="flex flex-col items-center justify-between">
                        {/* <p class="w-3/4 font-montserrat text-xs sm:text-lg mt-3">Description:</p> */}
                        <p class="w-3/4 font-montserrat text-xs sm:text-lg">{details.overview}</p>
                        <p class="w-3/4 font-montserrat text-sm sm:text-lg my-1">{'Release Date: ' + details.release_date}</p>
                        <button onClick={() => history.push({pathname: '/editor', movieId: props.movieId, title: details.title})} class="h-10 w-32 transition duration-500 ease-in-out button-color-beige rounded transform hover:-translate-y-1 hover:scale-110 font-montserrat font-bold text-white">Add entry</button>
                    </div>


                </div>
            
                <div class="flex w-full text-lg font-montserrat justify-around select-none mb-3 mt-5">
                    <div class={videoDisplay ? 'cursor-pointer' : 'font-bold cursor-pointer'} onClick={() => handleVideoDisplay(false)}>Images</div>
                    <div class={!videoDisplay ? 'cursor-pointer' : 'font-bold cursor-pointer'} onClick={() => handleVideoDisplay(true)}>Videos</div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {videoDisplay ?
                        videoIds.map(video => video.site === "YouTube" ? <div class='flex justify-center'><YouTube videoId={video.key} id={video.id} opts={opts} onReady={_onReady} /></div> : null)
                    :
                        images.map(image => <img src={image} alt="movie still" />)
                    }
                </div>


            </div>
        </div>

    )

}

export default Film