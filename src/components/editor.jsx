import React, { Component } from 'react';
import firebase from '../firebaseConfig'
import { render } from '@testing-library/react';
require('dotenv').config()

class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
           movieName: '',
           movieRating: '',
           movieReview: '',
           movieYear: '',
           movieImage: '',
           change: ''
        };
    }
    getMovieInfo = () => {
        let url = ''.concat('https://api.themoviedb.org/3/', 'search/movie?api_key=', process.env.REACT_APP_MOVIEDB_API_KEY, '&query=', this.state.movieName);
        fetch(url).then(result=>result.json()).then((data)=>{
                this.setState({movieImage:'https://image.tmdb.org/t/p/w500'+data.results[0].poster_path}) 
        })
    }
    sendSampleMovieEntry = () => {
        if (this.state.change) {
            let movieID = Math.floor(Math.random() * 10000)
            firebase.database().ref(`users/${this.props.googleId}/journals/${movieID}`).set({
                name: this.state.movieName,
                coverImage:  this.state.movieImage,
                dateOfEntry: this.state.movieYear,
                rating: this.state.movieRating,
                description: 'good'
            })  
        }
    }
    handleChangeMovieName = (e) => {
        this.setState({ 
            movieName: e.target.value,
            change: true
        }) 
    }
    handleChangeMovieRating = (e) => {
        this.setState({ 
            movieRating: e.target.value,
            change: true
        })
    }
    handleChangeMovieReview = (e) => {
        this.setState({ 
            movieReview: e.target.value,
            change: true
        })
    }
    handleChangeMovieYear = (e) => {
        this.setState({ 
            movieYear: e.target.value,
            change: true
        })
        this.getMovieInfo()
    }
    render() {
        return (
          
            <form class="w-full max-w-lg">
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label class=" text-gray-700 text-xs font-bold mb-2" >
                  Movie Name
                </label>
                <input onChange = {this.handleChangeMovieName} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane"/>
                
              </div>
              <div class="w-full md:w-1/2 px-3">
                <label class=" text-gray-700 text-xs font-bold mb-2" >
                  Movie Year
                </label>
                <input onChange = {this.handleChangeMovieYear} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe"/>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="review">
                  Review
                </label>
                <input onChange = {this.handleChangeMovieReview} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="Description"/>
                <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-2">
              
              <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                  Rate
                </label>
                <div class="relative">
                  <select onChange = {this.handleChangeMovieRating} class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>
              <div class="md:flex md:items-center">
                <div class="md:w-2/3">
                    <button onClick = {this.sendSampleMovieEntry}class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                        Submit
                     </button>
                 </div>
                </div>
            </div>
          </form>
        );
        }
}

export default Editor;