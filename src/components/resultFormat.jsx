import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import firebase from '../firebaseConfig'

function ResultFormat(props) {

    let history = useHistory();

    const [hover, setHover] = useState(false)
    const [info, setInfo] = useState(false)
    const [watchlist, setWatchlist] = useState(false)
    const [journal, setJournals] = useState(false)

    if (props.searchType === 'Films') {
        return (
            <div o class="flex w-full h-24 font-montserrat my-2 cursor-pointer hover:bg-gray-100 pr-3" onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                <img class="flex h-full" src={'https://image.tmdb.org/t/p/w500' + props.result.poster_path} alt='poster' onClick={() => history.push('/films/' + props.result.id)}></img>
                <div class="flex w-full justify-between items-center">
                    <div class="ml-3 mt-3 flex-col" onClick={() => history.push('/films/' + props.result.id)}>
                        <div class="font-montserrat text-md font-semibold">{props.result.title}</div>
                        <div class="text-xs mt-1">({props.result.release_date})</div>
                    </div>
                    <div class={hover ? null : 'sm:hidden'}>
                        <div class="sm:flex hidden">
                            <i class="fa fa-lg fa-info-circle mr-2 transition ease-in-out duration-200 transform hover:-translate-y-1 hover:scale-110" onMouseOver={() => setInfo(true)} onMouseLeave={() => setInfo(false)} onClick={() => history.push('/films/' + props.result.id)}/>
                            <i class="fa fa-lg fa-eye mr-2 transition ease-in-out duration-200 transform hover:-translate-y-1 hover:scale-110" onMouseOver={() => setWatchlist(true)} onMouseLeave={() => setWatchlist(false)}  onClick={() => history.push({pathname:'/watchlist', movieId: props.result.id, image: 'https://image.tmdb.org/t/p/w500'+props.result.poster_path, title: props.result.title})}/>
                            <i class="fa fa-lg fa-plus-circle mr-2 transition ease-in-out duration-200 transform hover:-translate-y-1 hover:scale-110" onMouseOver={() => setJournals(true)} onMouseLeave={() => setJournals(false)} onClick={() => history.push({pathname: '/editor', movieId: props.result.id, title:props.result.title})}/>
                        </div>
                        <div class='absolute font-montserrat text-xs'>
                            <p class={info ? '': 'hidden'}>Movie Info</p>
                            <p class={watchlist ? '': 'hidden'}>Add to watchlist</p>
                            <p class={journal ? '': 'hidden'}>Add to journals</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (props.searchType === 'Users') {
        return (
            <div onClick={() => history.push('/' + props.result.username)} class="flex w-full h-24 mb-3 px-3 cursor-pointer transition duration-300 hover:bg-gray-100">
                <div class="self-center rounded-full h-20 w-20 flex bg-cover" style={{ backgroundImage: "url('" + props.result.profilePicURL + "')" }}> </div>
                <div class="flex flex-col pl-4 pt-4">
                    <p class="text-md font-semibold">{props.result.username}</p>
                    <p class="text-xs">{props.result.bio}</p>
                </div>
            </div>
        )
    }

    if (props.searchType === 'Journals') {
        return (
            <div onClick={() => history.push('/' + props.username + '/movies/' + props.result.id)} class="flex w-full h-24 p-2 my-1 cursor-pointer transition duration-300 hover:bg-gray-100">
                <img class="h-full" src={props.result.coverImageURL} alt={props.result.name} alt="journal" />
                <div class="flex h-full items-center pl-3">
                    <div class="font-montserrat text-md font-semibold">{props.result.name}</div>
                </div>
            </div>
        )
    }

}

export default ResultFormat;