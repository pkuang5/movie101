import React, {useState, useEffect} from 'react';
import { useLocation, useHistory } from 'react-router'
import firebase from '../firebaseConfig'
import Noty from 'noty'

function WatchList(props){

    let location = useLocation()
    let history = useHistory()

    const [movies, setMovies] = useState([])
    const [trashMovies, setTrashMovies] = useState([])
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        if (editMode === false) {
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
        }
        
        if (location.movieId) addMovie(location.movieId, location.image, location.title)
    }, [location, editMode])

    function addMovie(movieId, posterImage, movieTitle) {
        firebase.database().ref(`users/${props.id}/watchlist/${movieId}`).set({
            image: posterImage,
            title: movieTitle
        })
    }

    function deleteMovies() {
        trashMovies.map( movie => {
            firebase.database().ref(`users/${props.id}/watchlist/${movie.id}`).remove()
        })
        if (trashMovies.length && trashMovies) showNotification()
        setTrashMovies([])
        setMovies([])
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

    return(
        <div class="flex flex-col w-screen items-center mt-3 px-6">
            <div class="lg:w-2/3 md:w-4/5 w-full items-center">
                <div class="flex justify-between w-full items-center">
                    <p class="font-yeseva text-2xl">Watchlist</p>
                    <div>
                        <i class={!editMode ? "fa fa-edit fa-lg hover:text-gray-600 cursor-pointer": 'hidden'} onClick={() => setEditMode(true)}/>
                        <i class={editMode ? "fa fa-times fa-lg hover:text-gray-600 cursor-pointer mr-3": 'hidden'} onClick={() => {setEditMode(false); setMovies([])}}/>
                        <i class={editMode ? "fa fa-trash fa-lg hover:text-gray-600 cursor-pointer": 'hidden'} onClick={() => {setEditMode(false); deleteMovies()}}/>
                    </div>
                </div>
                {editMode ?
                <p class="font-montserrat text-sm sm:text-md">Select movies to delete</p>
                :
                <p class="font-montserrat text-sm sm:text-md">Keep track of the movies you want to watch in the future!</p>
                }
                <div class="grid grid-cols-3 sm:grid-cols-5 gap-4">
                    {movies.map( movie =>
                        <img onClick={() => editMode ? !trashMovies.includes(movie) ? setTrashMovies([...trashMovies,movie]): setTrashMovies(trashMovies.filter(element => element !== movie)) : history.push(`/films/${movie.id}`)} class={trashMovies.includes(movie) ? "transition ease-in-out duration-200 transform hover:-translate-y-1 hover:scale-110 cursor-pointer border-yellow-400 border-solid border-4 h-56" : "transition ease-in-out duration-200 transform hover:-translate-y-1 hover:scale-110 cursor-pointer h-56"} src={movie.image} alt={movie.title} />
                    )}
                    {editMode ? null : 
                    <div onClick={() => history.push('/search')} class="h-56 w-40 items-center justify-center flex-col flex bg-brown1 transition ease-in-out duration-200 transform hover:-translate-y-1 hover:scale-110">
                        <i class="fa fa-plus-circle fa-2x"></i>
                        <p class="font-montserrat text-sm mt-1">Add movie</p>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default WatchList