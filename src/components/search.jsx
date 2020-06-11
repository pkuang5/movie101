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
                users.sort(function(a,b) {
                    if (a.username.toLowerCase() < b.username.toLowerCase()) return -1
                    if (a.username.toLowerCase() > b.username.toLowerCase()) return 1
                    return 0
                })
                let searchResult
                if (e.target.value.length === 1) {
                    searchResult = users.filter((user) => { return user.username.toLowerCase().charAt(0).includes(e.target.value.toLowerCase().charAt(0));})
                }
                else {
                    searchResult = users.filter((user) => { return user.username.toLowerCase().includes(e.target.value.toLowerCase()) && user.username.toLowerCase().charAt(0).includes(e.target.value.toLowerCase().charAt(0))})
                }
                
                if (searchResult.length === 0) setResults(false)
                else setResults(searchResult)
            } else setResults([])
        }
        if (search === 'Journals') {
            if (e.target.value !== '') {
                journals.sort(function(a,b) {
                    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1
                    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
                    return 0
                })
                let searchResult
                if (e.target.value.length === 1) {
                    searchResult = journals.filter((journal) => { return journal.name.toLowerCase().charAt(0).includes(e.target.value.toLowerCase().charAt(0));})
                }
                else {
                    searchResult = journals.filter((journal) => { return journal.name.toLowerCase().includes(e.target.value.toLowerCase()) && journal.name.toLowerCase().charAt(0).includes(e.target.value.toLowerCase().charAt(0))})
                }
                if (searchResult.length === 0) setResults(false)
                else setResults(searchResult)
            } else setResults([])
        }
    }

    return (
        <React.Fragment>
            <div class="flex w-screen justify-center font-montserrat bg-brown1 sm:-my-20 pt-40 px-6">
                <div class="flex flex-col lg:w-1/2 md:w-4/5 w-full pb-20">
                    <div class="flex text-sm mt-3 text-black items-center">
                        <p class="text-2xl font-yeseva mr-4">Search</p>
                        <p onClick={() => {setSearch('Films'); document.getElementById('searchBar').value = ''}} class={search === 'Films' ? "border-b-2 border-black font-semibold cursor-pointer mr-4" : "cursor-pointer mr-4"}>FILMS</p>
                        <p onClick={() => {setSearch('Users'); document.getElementById('searchBar').value = ''}} class={search === 'Users' ? "border-b-2 border-black  font-semibold cursor-pointer mr-4" : "cursor-pointer mr-4"}>USERS</p>
                        <p onClick={() => {setSearch('Journals'); document.getElementById('searchBar').value = ''}} class={search === 'Journals' ? "border-b-2 border-black font-semibold cursor-pointer mr-4" : "cursor-pointer mr-4"}>JOURNALS</p>
                    </div>
                    <input autoComplete="off" id="searchBar" onChange={handleSearch} class="w-full text-md placeholder-black border-2 rounded-sm border-black p-2 focus:outline-none bg-brown1" type="text" placeholder={placeholder}/>
                </div>
            </div>
            <div class="h-full w-screen justify-center flex mt-20">
                <div class="w-1/2 mt-10">
                    {(results) ? results.map(result => 
                        <ResultFormat result={result} searchType = {search} username={props.username} />
                    ): <div class="font-montserrat">No search results for {query}</div>}
                </div>
            </div>
        </React.Fragment>
    );
}

export default Search;