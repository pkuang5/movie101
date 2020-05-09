import React, { Component } from 'react';
import firebase from '../firebaseConfig'
import { render } from '@testing-library/react';
import Noty from 'noty'
import 'noty/lib/noty.css'
import 'noty/lib/themes/bootstrap-v4.css'
require('dotenv').config()

class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
           movieName: '',
           movieRating: '5',
           movieReview: '',
           movieYear: '',
           movieImage: '',
           movieId: '',
           change: '',
           featured: true,
           images: [],
           specificImages: [],
           imagesToStore: []
        };
   }
  showNotification = () => {
      new Noty({
          type: 'success',
          theme: 'bootstrap-v4',
          layout: 'bottomRight',
          text: 'You Changes Have Been Saved!',
          timeout: 3000
      }).show()
  }
    showImage = () => {
      new Noty({
          type: 'success',
          theme: 'bootstrap-v4',
          layout: 'bottomRight',
          text: 'Image has been selected!',
          timeout: 3000
      }).show()
    } 
    getMovieInfo = () => {
        this.state.images.length = 0; // deleted array upon every call
        this.state.specificImages.length = 0;
        let url = ''.concat('https://api.themoviedb.org/3/', 'search/movie?api_key=', process.env.REACT_APP_MOVIEDB_API_KEY, '&query=', this.state.movieName);
        fetch(url).then(result=>result.json()).then((data)=>{
          let stateList = this.state.images;
                var i
                for (i in data.results) {
            
                  let movieEntry = {
                    image: ('https://image.tmdb.org/t/p/w500'+data.results[i].poster_path),
                    title: data.results[i],
                    id: data.results[i].id
                  }
                  if (movieEntry.image !== 'https://image.tmdb.org/t/p/w500null'){
                    stateList.push(movieEntry)
                  }
                  
                }
                this.setState({images: stateList}) 
                this.setState({movieImage:'https://image.tmdb.org/t/p/w500'+data.results[0].poster_path})
        })
    }
    getMovieImage = (i) => {
      this.state.specificImages.length = 0; // deleted array upon every call
      let url = ''.concat('https://api.themoviedb.org/3/', 'movie/' ,i , '/images', '?api_key=', process.env.REACT_APP_MOVIEDB_API_KEY, '&query=', this.state.movieName);
      fetch(url).then(result=>result.json()).then((data)=>{
        let imageList = this.state.specificImages;
              var i
              for (i = 0; i < 9; i++) {
                let movieImageEntry = {
                  image: ('https://image.tmdb.org/t/p/w500'+data.backdrops[i].file_path),
                }
                if (movieImageEntry.image !== 'https://image.tmdb.org/t/p/w500null'){
                  imageList.push(movieImageEntry)
                }
                
              }
              this.setState({specificImages: imageList}) 
      })
  }
    handleSubmit = () => {
        if (this.state.change) {
          this.showNotification()
            firebase.database().ref(`users/${this.props.googleId}/journals/${this.state.movieId}`).set({
                name: this.state.movieName,
                coverImage:  this.state.movieImage,
                dateOfEntry: this.state.movieYear,
                rating: this.state.movieRating,
                description: this.state.movieReview,
                featured: this.state.featured,
                images: this.state.imagesToStore
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
    }
    handleFeatured = (e) => {
      if (e.target.value === 'Yes') {
        this.setState({
          featured: true
        })
      }
      else {
        this.setState({
          featured: false
        })
      }
    }
    handleSearch = () => {
      this.getMovieInfo()
    }
    handleImgClick = (e,i) => {
      this.setState({
        movieImage:e,
        movieId: i
      })
      this.getMovieImage(i)
      this.showImage()
    }
    handleSpecificImgClick = (e) => {
      console.log(e)
      this.state.imagesToStore.push(e)
      console.log(this.state.imagesToStore)
    }
    
    render() {
        return (
            <form class="w-full max-w-lg">
              <p>Fill in the following information, Search, and Submit!</p>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label class=" text-gray-700 text-xs font-bold mb-2" >
                  Movie Name
                </label>
                <input onChange = {this.handleChangeMovieName} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Screenbook Documentary"/>
              </div>
              <div class="w-full md:w-1/2 px-3">
                <label class=" text-gray-700 text-xs font-bold mb-2" >
                  Movie Year
                </label>
                <input onChange = {this.handleChangeMovieYear} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="2000's"/>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="review">
                  Review
                </label>
                <input onChange = {this.handleChangeMovieReview} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password"  placeholder="Description"/>
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
                    <button onClick = {this.handleSearch}class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                        Search: 
                     </button>
                 </div>          
                </div>
                <div class="md:flex md:items-center">
                <div class="md:w-2/3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                  Publish in Featured?
                </label>
                <select onChange = {this.handleFeatured} class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                 </div>          
                </div> 
              <div class="md:flex md:items-center">
                <div class="md:w-2/3">
                    <button onClick = {this.handleSubmit}class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                        Submit
                     </button>
                 </div>          
                </div>            
                {this.state.images.map(movieEntry =>    
                  <div class="flex flex-col w-32 h-auto items-end justify-start">
                           <img class = "hover:opacity-75 focus:shadow-outline" src={movieEntry.image} alt= {movieEntry.title} onClick = {() => this.handleImgClick(movieEntry.image, movieEntry.id)}/>
                  </div>)}
                  <div>
                  {this.state.specificImages.map(movieImageEntry =>    
                  <div class="flex flex-col w-32 h-auto items-end justify-start">
                           <img class = "hover:opacity-75 focus:shadow-outline" src={movieImageEntry.image} onClick = {() => this.handleSpecificImgClick(movieImageEntry.image)}/>
                  </div>)}
                  </div>
            </div>
          </form>
        );
        }
}
export default Editor;