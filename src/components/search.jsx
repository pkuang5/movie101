import React, { useState, useEffect} from 'react';
import firebase from '../firebaseConfig'
import ResultFormat from './resultFormat'
require('dotenv').config()

function Search(props) {

    const [search, setSearch] = useState('Films')
    const [query, setQuery] = useState('')
    const [placeholder, setPlaceholder] = useState('')
    const [results, setResults] = useState([])
    const [users, setUsers] = useState([])
    const [journals,setJournals] = useState([])

    useEffect(() => {
        if (search === 'Films') {
            setResults([])
            setPlaceholder('Search any film')
        }
        if (search === 'Users') {
            setResults([])
            setPlaceholder('Search for a user')
            if (users.length === 0) {
                firebase.database().ref('users').orderByChild('userName').once("value", (snapshot) => {
                    snapshot.forEach((data) => {
                        let userObject = {
                            username: data.val().userName,
                            bio: data.val().bio,
                            profilePicURL: data.val().profileURL
                        }
                        setUsers(results => [...results,userObject])
                    });
                });
            }
        } 
        if (search === 'Journals') {
            setResults([])
            setPlaceholder('Search through your journals')
            if (journals.length === 0) {
                firebase.database().ref('users/' + props.googleId + '/journals').once('value', (snapshot) => {
                    snapshot.forEach((data) => {
                        let journal = {
                            id: data.key,
                            name: data.val().name,
                            coverImageURL: data.val().coverImage
                        }
                        setJournals(journals => [...journals,journal]);
                    });
                })
            }
        } 
    }, [search])

    const handleSearch = (e) => {
        setQuery(e.target.value)
        if (search === 'Films') {
            if (e.target.value !== '') {
                let url = ''.concat('https://api.themoviedb.org/3/', 'search/movie?api_key=', process.env.REACT_APP_MOVIEDB_API_KEY, '&query=', e.target.value);
                fetch(url).then(result=>result.json()).then((data)=>{
                    if (data.results.length!= 0) setResults(data.results)
                    else setResults(false)
                })
            } else setResults([])
        }
        if (search === 'Users') {
            if (e.target.value !== '') {
                let searchResult = users.filter((user) => { return user.username.toLowerCase().includes(e.target.value.toLowerCase());})
                if (searchResult.length === 0) setResults(false)
                else setResults(searchResult)
            } else setResults([])
        }
        if (search === 'Journals') {
            if (e.target.value !== '') {
                let searchResult = journals.filter((journal) => { return journal.name.toLowerCase().includes(e.target.value.toLowerCase());})
                if (searchResult.length === 0) setResults(false)
                else setResults(searchResult)
            } else setResults([])
        }
    }

    return (
        <div class="flex w-screen justify-center font-montserrat mt-32 px-6">
            <div class="flex flex-col lg:w-1/2 md:w-4/5 w-full ">
                <p class="text-2xl font-semibold mb-3">Search</p>
                <input autocomplete="off" id="searchBar" onChange={handleSearch} class="w-full text-md text-gray-700 border-b focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder={placeholder}/>
                <div class="flex text-sm mt-3 text-gray-500">
                    <p onClick={() => {setSearch('Films'); document.getElementById('searchBar').value = ''}} class={search === 'Films' ? "text-black font-semibold cursor-pointer mr-5" : "cursor-pointer mr-5"}>Films</p>
                    <p onClick={() => {setSearch('Users'); document.getElementById('searchBar').value = ''}} class={search === 'Users' ? "text-black font-semibold cursor-pointer mr-5" : "cursor-pointer mr-5"}>Users</p>
                    <p onClick={() => {setSearch('Journals'); document.getElementById('searchBar').value = ''}} class={search === 'Journals' ? "text-black font-semibold cursor-pointer mr-5" : "cursor-pointer mr-5"}>Journals</p>
                </div>
                <div class="h-full my-2">
                    {(results) ? results.map(result => 
                        <ResultFormat result={result} searchType = {search} username={props.username} />
                    ): <div class="font-montserrat">No search results for {query}</div>}
                </div>
            </div>
        </div>
    );
}

export default Search;