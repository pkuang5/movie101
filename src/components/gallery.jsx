import React, { useState, useEffect } from 'react';
import firebase from '../firebaseConfig'
import { useHistory } from 'react-router-dom'


function Gallery(props) {

    const [movies, setMovies] = useState([])
    const [displayedMovies, setDisplayedMovies] = useState([])
    const [moviesLoaded, setMoviesLoaded] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    let history = useHistory();

    useEffect(() => {
        if (props.googleId) {
            setMovies(movies.length = 0)
            var userInfo = firebase.database().ref('users/' + props.googleId + '/journals')
            if (props.featured) userInfo = userInfo.orderByChild('featured').equalTo(true)
            userInfo.once('value', (snapshot) => {
                let temp = [];
                snapshot.forEach((data) => {
                    let movie = {
                        id: data.key,
                        name: data.val().name,
                        coverImageURL: data.val().coverImage
                    }
                    temp.push(movie);
                })
                setMovies(movies.concat(temp))
                setDisplayedMovies(movies.concat(temp))
                if (!temp || !temp.length) setMoviesLoaded(false)
            })
        }
    }, [props.googleId, props.featured]);

    function handleMovieClick(id) {
        history.push({
            pathname: "/" + props.username + "/movies/" + id,
            localUser: props.localUser,
        });
    }

    const handleSearch = (e) => {
        setSearchQuery(e.target.value)
        let tempArr = movies;
        setDisplayedMovies(tempArr.filter(function(value){ return value.name.toLowerCase().includes(e.target.value.toLowerCase());}))
    }

    return (
        <React.Fragment>
            <div class="flex w-full mb-3">
                <svg width="30" height="30" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" />
                  <circle cx="20.5" cy="17.5" r="10.5" stroke="gray" stroke-width="2" />
                  <line x1="28.1584" y1="25.244" x2="37.256" y2="34.3417" stroke="gray" stroke-width="2" stroke-linecap="round" />
                </svg>
                <input onChange={handleSearch} class="appearance-none w-full text-gray-700 border-black-600 mb-3 focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="search"/>
            </div>
            {moviesLoaded ?
                displayedMovies && displayedMovies.length ? 
                    <div class="grid grid-cols-3 md:grid-cols-4 lg:col-gap-12 md:col-gap-6 col-gap-2 lg:row-gap-10 md:row-gap-5 row-gap-2 grid-rows-2 mb-5">
                    {displayedMovies.map(movieEntry =>
                        <div class="transition ease-in-out duration-200 transform hover:-translate-y-1 hover:scale-110 flex flex-col cursor-pointer justify-center" onClick={() => handleMovieClick(movieEntry.id)}>
                            <img class="w-full" src={movieEntry.coverImageURL} alt={movieEntry.name} />
                        </div>)}
                    </div>
                    :
                    <p> No search results for {searchQuery}</p>
                : 
                props.localUser ? 
                <div class="transition ease-in-out duration-200 transform hover:-translate-y-1 hover:scale-110 flex flex-col cursor-pointer w-40 h-56 bg-gray-200 justify-center items-center text-gray-700 hover:bg-gray-300" onClick={() => history.push('/editor')}>
                    <i class="fa fa-plus-circle fa-2x"></i>
                    <p class="font-montserrat text-sm mt-1">Add movie</p>
                </div>
                : 
                <p class="text-md font-montserrat">This user has no movies</p>
            }
        </React.Fragment>
    );

}

export default Gallery;