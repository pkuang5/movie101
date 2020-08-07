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
            firebase.database().ref('users/' + props.id + '/watchlist').orderByChild('timestamp').startAt(0).once('value',(snapshot) => {
                let temp = [];
                snapshot.forEach((data) => {
                    let movie = {
                        id: data.key,
                        image: data.val().image,
                        title: data.val().title,
                        timestamp: data.val().timestamp
                    }
                    temp.push(movie)
                })
                setMovies(movies.concat(temp))
            })
        }
        if (location.movieId) addMovie(location.movieId, location.image, location.title)
    }, [location, editMode])

    function getExactDate (separator='') {

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        var hours = newDate.getHours(); //To get the Current Hours
        var min = newDate.getMinutes(); //To get the Current Minutes
        var sec = newDate.getSeconds(); //To get the Current Seconds
        if (month < 10) month = '0' + month
        if (date < 10) date = '0' + date
        if(hours<10) hours = '0' + hours
        if(min<10) min= '0' + min
        if(sec<10) sec='0' + sec
        return year + month + date + hours + min + sec
  
    }
    function addMovie(movieId, posterImage, movieTitle) {
        let date = getExactDate('/')
        firebase.database().ref(`users/${props.id}/watchlist/${movieId}`).set({
            image: posterImage,
            title: movieTitle,
            timestamp: date
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
                    <p class="font-montserrat text-2xl">Watchlist</p>
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
                    {movies.slice().reverse().map( movie =>
                        <img onClick={() => editMode ? !trashMovies.includes(movie) ? setTrashMovies([...trashMovies,movie]): setTrashMovies(trashMovies.filter(element => element !== movie)) : history.push(`/films/${movie.id}`)} class={trashMovies.includes(movie) ? "transition ease-in-out duration-200 sm:transform hover:-translate-y-1 hover:scale-110 cursor-pointer border-yellow-400 border-solid border-4" : "transition ease-in-out duration-200 sm:transform hover:-translate-y-1 hover:scale-110 cursor-pointer"} src={movie.image} alt={movie.title} />
                    )}
                    {editMode ? null : <div onClick={() => history.push('/search')} class={movies && movies.length ? "flex flex-col w-full h-42 sm:h-56 bg-gray-200 items-center justify-center transition ease-in-out duration-200 sm:transform hover:-translate-y-1 hover:scale-110 cursor-pointer": 'flex flex-col w-full h-40 sm:h-56 bg-gray-200 items-center justify-center transition ease-in-out duration-200 sm:transform hover:-translate-y-1 hover:scale-110 cursor-pointer'}>
                        <i class="fa fa-plus-circle fa-2x"></i>
                        <p class="font-montserrat text-sm mt-1">Add movie</p>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default WatchList