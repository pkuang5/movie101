import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

function Film(props) {

    useEffect(() => {

    }, [props.movieId])

    function callApi(parameter, callback) {
        let url = ''.concat('https://api.themoviedb.org/3/',parameter,'?api_key=',process.env.REACT_APP_MOVIEDB_API_KEY,'&language=en-US&page=1')
        fetch(url).then(result=>result.json()).then((data)=>{
            callback(data.results)

        })
    }

    return (
        <h1>Film Page</h1>
    )

}

export default Film