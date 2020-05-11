import React, { useState, useEffect} from 'react';
require('dotenv').config()

function Search(props) {

    const [search, setSearch] = useState('Films')
    const [query, setQuery] = useState('')
    const [placeholder, setPlaceholder] = useState('')
    const [results, setResults] = useState([])

    useEffect(() => {
        if (search === 'Films') setPlaceholder('Search any film')
        if (search === 'Users') setPlaceholder('Search for a user')
        if (search === 'Journals') setPlaceholder('Search through your journals')
    }, [search])

    const handleSearch = (e) => {
        setQuery(e.target.value)
        if (e.target.value !== '') {
            let url = ''.concat('https://api.themoviedb.org/3/', 'search/movie?api_key=', process.env.REACT_APP_MOVIEDB_API_KEY, '&query=', e.target.value);
            fetch(url).then(result=>result.json()).then((data)=>{
                if (data.results.length!= 0) setResults(data.results)
                else setResults(false)
            })
        } else setResults([])
    }

    return (
        <div class="flex w-screen justify-center font-montserrat mt-40">
            <div class="flex flex-col w-1/2">
                <p class="text-2xl font-semibold mb-3">Search</p>
                <input onChange={handleSearch} class="w-full text-md text-gray-700 border-b focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder={placeholder}/>
                <div class="flex text-sm mt-3 text-gray-500">
                    <p onClick={() => setSearch('Films')} class={search === 'Films' ? "text-black font-semibold cursor-pointer mr-5" : "cursor-pointer mr-5"}>Films</p>
                    <p onClick={() => setSearch('Users')} class={search === 'Users' ? "text-black font-semibold cursor-pointer mr-5" : "cursor-pointer mr-5"}>Users</p>
                    <p onClick={() => setSearch('Journals')} class={search === 'Journals' ? "text-black font-semibold cursor-pointer mr-5" : "cursor-pointer mr-5"}>Journals</p>
                </div>
                {(results) ? results.map(entry => 
                    <div class="flex w-full h-24 font-montserrat my-2">
                        <img class="flex h-full" src={'https://image.tmdb.org/t/p/w500'+entry.poster_path}></img>
                        <div class="ml-3 mt-3 flex-col">
                            <div class="font-montserrat text-md font-semibold">{entry.title}</div>
                            <div class="text-xs mt-1">({entry.release_date})</div>
                        </div>
                    </div>
                ): <div class="font-montserrat my-2">No search results for {query}</div>}
            </div>
        </div>
    );
}

export default Search;