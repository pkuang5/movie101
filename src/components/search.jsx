import React, { useState, useEffect} from 'react';

function Search(props) {

    const [search, setSearch] = useState('Films')
    const [placeholder, setPlaceholder] = useState('')

    useEffect(() => {
        if (search === 'Films') setPlaceholder('Search any film')
        if (search === 'Users') setPlaceholder('Search for a user')
        if (search === 'Journals') setPlaceholder('Search through your journals')
    }, [search])

    const handleSearch = (e) => {

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
            </div>
        </div>
    );
}

export default Search;