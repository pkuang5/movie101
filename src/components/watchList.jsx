import React, {useState, useEffect} from 'react';
import { useLocation, useHistory } from 'react-router'
import firebase from '../firebaseConfig'


function WatchList(props){

    let location = useLocation()
    let history = useHistory()

    const [movies, setMovies] = useState([])

    useEffect(() => {
        firebase.database().ref('users/' + props.id + '/watchlist').once('value', (snapshot) => {
            let temp = []
            snapshot.forEach((data) => {
                let movie = {
                    id: data.key,
                    image: data.val().image,
                    title: data.val().title
                }
                temp.push(movie)
            })
            setMovies(movies.concat(temp))
        })
        
        if (location.movieId) addMovie(location.movieId, location.image, location.title)
    }, [location])

    function addMovie(movieId, posterImage, movieTitle) {
        firebase.database().ref(`users/${props.id}/watchlist/${movieId}`).set({
            image: posterImage,
            title: movieTitle
        })
    }

    return(
        <div class="flex flex-col w-screen items-center mt-3 px-6">
            <div class="lg:w-2/3 md:w-4/5 w-full items-center">
                <p class="font-montserrat text-2xl">Watchlist</p>
                <div class="grid grid-cols-3 sm:grid-cols-5 gap-4">
                    {movies.map( movie =>
                        <img onClick={() => history.push(`/films/${movie.id}`)} class="transition ease-in-out duration-200 transform hover:-translate-y-1 hover:scale-110 cursor-pointer" src={movie.image} alt={movie.title} />
                    )}
                    <div onClick={() => history.push('/search')} class="flex flex-col w-full h-full bg-gray-200 items-center justify-center transition ease-in-out duration-200 transform hover:-translate-y-1 hover:scale-110 cursor-pointer">
                        <i class="fa fa-plus-circle fa-2x"></i>
                        <p class="font-montserrat text-sm mt-1">Add movie</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WatchList