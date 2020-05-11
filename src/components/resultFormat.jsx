import React from 'react';
import { useHistory } from 'react-router-dom'

function ResultFormat(props) {

    let history = useHistory();

    if (props.searchType === 'Films') {
        return (
            //TODO: implement movie page and route to that 
            <div  class="flex w-full h-24 font-montserrat my-2">
                <img class="flex h-full" src={'https://image.tmdb.org/t/p/w500' + props.result.poster_path}></img>
                <div class="ml-3 mt-3 flex-col">
                    <div class="font-montserrat text-md font-semibold">{props.result.title}</div>
                    <div class="text-xs mt-1">({props.result.release_date})</div>
                </div>
            </div>
        )
    }

    if (props.searchType === 'Users') {
        return (
            <div onClick={() => history.push('/' + props.result.username)} class="flex w-full h-24 my-2 px-3 cursor-pointer hover:bg-gray-100">
                <div class="self-center rounded-full h-24 w-24 flex bg-cover" style={{ backgroundImage: "url('" + props.result.profilePicURL + "')" }}> </div>
                <div class="flex flex-col pl-4 pt-4">
                    <p class="text-md font-semibold">{props.result.username}</p>
                    <p class="text-xs">{props.result.bio}</p>
                </div>
            </div>
        )
    }

    if (props.searchType === 'Journals') {
        return (
            <div onClick={() => history.push('/' + props.username + '/movies/' + props.result.id)} class="flex w-full h-24 font-montserrat my-2">
                <img class="h-full" src={props.result.coverImageURL} alt={props.result.name} />
                <div class="ml-3 mt-3 flex-col">
                    <div class="font-montserrat text-md font-semibold">{props.result.name}</div>
                </div>
            </div>
        )
    }

}

export default ResultFormat;