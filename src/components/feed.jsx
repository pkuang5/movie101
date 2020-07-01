import React, { useState, useEffect } from 'react';
import firebase from "../firebaseConfig";
import { useHistory } from 'react-router-dom'
import Content from './content'

function Feed (props) {
    
    const [firstName, setName] = useState()
    const [trendingMovies, setTrendingMovies] = useState([])
    const [nowPlayingMovies, setNowPlayingMovies] = useState([])
    const [upcomingMovies, setUpcomingMovies] = useState([])

    let history = useHistory();

    useEffect(() => {
        var userInfo = firebase.database().ref('users/' + props.googleId)
        userInfo.once('value', (snapshot) => {
            if (snapshot.val()) setName(snapshot.val().firstName)
        })
        callApi('trending/movie/week', setTrendingMovies)
        callApi('movie/now_playing', setNowPlayingMovies)
        callApi('movie/upcoming', setUpcomingMovies)
        
    }, [props.googleId])

    function callApi(parameter, callback) {
        let url = ''.concat('https://api.themoviedb.org/3/',parameter,'?api_key=',process.env.REACT_APP_MOVIEDB_API_KEY,'&language=en-US&page=1')
        fetch(url).then(result=>result.json()).then((data)=>{
            callback(data.results)

        })
    }

    function movieRow(list, listName){
        return(
            <div class="w-full my-3">
                <p class="font-montserrat text-xl border-b border-black pb-1">{listName}</p>
                <div class="overflow-x-scroll overflow-y-hidden flex flex-no-wrap bg-brown1 h-auto">
                {list.map(movie =>  movie.poster_path ?  
                    <img onClick = {() => history.push('/films/' + movie.id)}
                    class ="w-24 sm:w-32 h-full m-3 sm:m-4 cursor-pointer transition ease-in-out duration-200 transform hover:-translate-y-1 hover:scale-105 " src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} alt= {movie.title} />
                    : null
                )}
                </div>
            </div>
        )
    }

    return (
        <React.Fragment>

            <div class="flex w-full justify-center mt-3 px-6">
                <div class="flex flex-col lg:w-2/3 md:w-4/5 w-full items-center">
                    <p class="font-yeseva text-3xl">Screenbook</p>
                    <p class="font-montserrat text-xs sm:text-sm text-center w-3/5 mt-3"> Welcome, {firstName}! This is your feed. See what movies are popular in the Screenbook community and follow other members to see their journals. Or, get started on your own journal. </p>
                    <button onClick = {() => history.push('/editor')} class="transition duration-500 ease-in-out rounded transform hover:-translate-y-1 hover:scale-110 button-color-beige font-montserrat font-semibold text-white py-2 px-4 rounded w-1/3 my-3">+ add entry</button>
                    {movieRow(trendingMovies, 'Trending Films')}
                    {movieRow(nowPlayingMovies, 'Now Playing')}
                    {movieRow(upcomingMovies, 'Upcoming Films')}
                </div>
            </div>
            <Content id={props.googleId} />
        </React.Fragment>
    );
 }

export default Feed;