import React, { useState, useEffect } from 'react';
import firebase from "../firebaseConfig";
import { useHistory } from 'react-router-dom'

function Feed (props) {
    
    const [firstName, setName] = useState()
    const [trendingMovies, setTrendingMovies] = useState([])
    const [popularMovies, setPopularMovies] = useState([])
    const [nowPlayingMovies, setNowPlayingMovies] = useState([])
    const [topRatedMovies, setTopRatedMovies] = useState([])
    const [upcomingMovies, setUpcomingMovies] = useState([])

    let history = useHistory();

    useEffect(() => {
        var userInfo = firebase.database().ref('users/' + props.googleId)
        userInfo.once('value', (snapshot) => {
            if (snapshot.val()) setName(snapshot.val().firstName)
        })
        callApi('trending/movie/week', setTrendingMovies)
        callApi('movie/popular', setPopularMovies)
        callApi('movie/now_playing', setNowPlayingMovies)
        callApi('movie/top_rated', setTopRatedMovies)
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
                <p class="font-montserrat text-xl font-semibold">{listName}</p>
                <div class="overflow-x-scroll overflow-y-hidden flex flex-no-wrap bg-gray-200 h-auto">
                {list.map(movie =>  movie.poster_path ?  
                    <img onClick = {() => history.push('/films/' + movie.id)}
                    class ="w-24 sm:w-32 h-full m-2 sm:m-4 cursor-pointer transition ease-in-out duration-200 transform hover:-translate-y-1 hover:scale-105 " src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} alt= {movie.title} />
                    : null
                )}
                </div>
            </div>
        )
    }

    return (
        <div class="flex w-screen justify-center mt-3 px-6">
            <div class="flex flex-col lg:w-2/3 md:w-4/5 w-full items-center">
                <p class="font-serif text-3xl font-bold">Screenbook</p>
                <p class="font-montserrat text-xs sm:text-sm text-center w-3/5 mt-3"> Welcome, {firstName}! This is your feed. See what movies are popular in the Screenbook community and follow other members to see their journals. Or, get started on your own journal. </p>
                <button onClick = {() => history.push('/editor')} class="button-color-beige hover:opacity-75 font-montserrat font-semibold text-white py-2 px-4 rounded w-40 my-3">+ add entry</button>
                {movieRow(trendingMovies, 'Trending Films')}
                {movieRow(popularMovies, 'Popular Films')}
                {movieRow(nowPlayingMovies, 'Now Playing')}
                {movieRow(topRatedMovies, 'Top Rated Films')}
                {movieRow(upcomingMovies, 'Upcoming Films')}
            </div>
        </div>
    );
 }

export default Feed;