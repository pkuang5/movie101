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
        console.log(url)
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
        <div class="flex flex-col w-screen items-center p-3">
            <i onClick={() => history.push({pathname: '/editor', movieId: props.movieId})} class="fa fa-plus-circle fa-lg float-right"></i>
            <p class="font-montserrat text-center text-2xl font-semibold">{details.title}</p>
            <p class="w-3/4 font-montserrat text-center text-xs my-1">{details.release_date}</p>
            <img class="w-3/4" src={'https://image.tmdb.org/t/p/w500' + details.poster_path} alt="poster" />
            <p class="w-3/4 font-montserrat text-xs my-3">{details.overview}</p>
            <div class="flex w-full text-lg font-montserrat justify-around select-none my-3">
                <div class={videoDisplay ? 'cursor-pointer' : 'font-bold cursor-pointer'} onClick={() => handleVideoDisplay(false)}>Images</div>
                <div class={!videoDisplay ? 'cursor-pointer' : 'font-bold cursor-pointer'} onClick={() => handleVideoDisplay(true)}>Videos</div>
            </div>
            {videoDisplay ?
                videoIds.map(video => video.site === "YouTube" ? <div class='flex justify-center my-2'><YouTube videoId={video.key} id={video.id} opts={opts} onReady={_onReady} /></div> : null)
            :
                images.map(image => <img class='my-2' src={image} alt="movie still" />)
            }

        </div>

    )

}

export default Film