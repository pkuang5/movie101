import React, { useState, useEffect} from 'react';
require('dotenv').config()

function Search(props) {

    const [search, setSearch] = useState('Films')
    const [placeholder, setPlaceholder] = useState('')
    const [results, setResults] = useState([])

    useEffect(() => {
        if (search === 'Films') setPlaceholder('Search any film')
        if (search === 'Users') setPlaceholder('Search for a user')
        if (search === 'Journals') setPlaceholder('Search through your journals')
    }, [search])

    const handleSearch = (e) => {
        let url = ''.concat('https://api.themoviedb.org/3/', 'search/movie?api_key=', process.env.REACT_APP_MOVIEDB_API_KEY, '&query=', e.target.value);
        fetch(url).then(result=>result.json()).then((data)=>{
            setResults(data.results)
        })
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
                {results.map(entry => 
                    <div class="w-full h-16 font-montserrat bg-gray-200">
                        <div class="text-md">{entry.title}</div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Search;