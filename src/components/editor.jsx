import React, { Component } from 'react';
import firebase from '../firebaseConfig'
import { render } from '@testing-library/react';
import Noty from 'noty'
import 'noty/lib/noty.css'
import 'noty/lib/themes/bootstrap-v4.css'
import DropSearch from './dropSearch'
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
    getMovieInfo = (title) => {
        this.setState({images: []})
        this.setState({specificImages: []})
        let url = ''.concat('https://api.themoviedb.org/3/', 'search/movie?api_key=', process.env.REACT_APP_MOVIEDB_API_KEY, '&query=', title);
        fetch(url).then(result=>result.json()).then((data)=>{
          let stateList = this.state.images;
                var i
                for (i in data.results) {
                  let movieEntry = {
                    image: ('https://image.tmdb.org/t/p/w500'+data.results[i].poster_path),
                    title: data.results[i].title,
                    id: data.results[i].id
                  }
                  if (movieEntry.image !== 'https://image.tmdb.org/t/p/w500null'){
                    stateList.push(movieEntry)
                  }
                }
                this.setState({images: stateList}) 
                this.setState({
                  movieImage:'https://image.tmdb.org/t/p/w500'+data.results[0].poster_path,
                  movieId: data.results[0].id
                })
                this.getMovieImage(data.results[0].id)
        })
        
    }
    getMovieImage = (i) => {
      this.setState({specificImages: []})
      let url = ''.concat('https://api.themoviedb.org/3/', 'movie/' ,i , '/images', '?api_key=', process.env.REACT_APP_MOVIEDB_API_KEY, '&query=', this.state.movieName);
      fetch(url).then(result=>result.json()).then((data)=>{
        let imageList = this.state.specificImages;
              var i
              for (i in data.backdrops) {
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
        this.setState({movieRating: '5'})
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
    handleImgClick = (e,i,n) => {
      if (this.state.movieImage === e) {
        this.setState({
          movieImage: '',
        })
      }
      else {
        this.setState({
          movieImage:e,
          movieId: i,
          movieName:n
        })
        this.getMovieImage(i)
        this.showImage()
      }
    }
    handleSpecificImgClick = (e) => {
      let arr = this.state.imagesToStore
      if (this.state.imagesToStore.includes(e)) {
        var index = arr.indexOf(e)
        const temp = arr.slice(0,index).concat(arr.slice(index+1, arr.length))
        arr = temp
        this.setState({imagesToStore:arr})
      }
      else {
        arr = this.state.imagesToStore
        arr.push(e)
        this.setState({imagesToStore: arr})
      }
    }
   
    render() {
        return (
          <div class="grid grid-cols-2 gap-4">
          {/* left half */}
          <div class = " h-16 bg-blue-400 pt-8">
              <p class="font-serif text-3xl font-bold ">Editor</p>
              <p class="font-serif  font-bold pb-4">Fill in the information, search, and submit!</p>
              <div class = "pt-2 grid grid-cols-3 gap-2 border-8 border-yellow-600 ">  
                  <div >
                      <p>Title</p>
                      <DropSearch getMovieInfo = {this.getMovieInfo} onChange = {(e) => this.setState({ movieName: e.target.value, change: true}) } onChange2 = {(e, date) => this.setState({movieName: e, change: true, movieYear: date})}></DropSearch>
                  </div>
                  <div>
                      <p>Date</p>
                      <input onChange = {(e) => this.setState({ movieYear: e.target.value, change: true})} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder={this.state.movieYear}/>
                  </div>
                  <div>
                      <p>Search</p>
                      <button onClick = {() => this.getMovieInfo(this.state.movieName)}class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                        Search: 
                      </button>
                  </div>
              </div>
              <div class = "pt-8 border border-8 border-color-green-800 w-full h-48 pb-4 ">
                  <p>Review</p>
                  <input onChange = {(e) => this.setState({ movieReview: e.target.value, change: true})} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password"  placeholder="Description"/>
              </div>
              <div class = "pt-8 border-8 border-blue-400 h-48">
              <div class = "pt-2 grid grid-cols-3 gap-2 border-8 border-yellow-600 "> 
                  <div>
                      <p>Rate</p>
                      <select onChange = {(e) => this.setState({ movieRating: e.target.value, change: true})} class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                        <option>5</option>
                        <option>4</option>
                        <option>3</option>
                        <option>2</option>
                        <option>1</option>
                      </select>
                  </div>
                  <div>
                      <p class ="pl-4">Submit</p>
                      <button onClick = {this.handleSubmit}class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                        Submit
                      </button>
                  </div>
                  <div>
                      <p>Publish in Featured</p>
                      <select onChange = {this.handleFeatured} class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                        <option>Yes</option>
                        <option>No</option>
                      </select>
                  </div>
              </div>
              </div>
          </div>
          {/* right half */}
          <div class = " h-16 bg-blue-400 pt-8">
              <div class = "pt-16 grid-rows-2 ">
                  <div class = "flex border-8 border-blue-800 pt-8 pb-8 h-auto ">
                      <p class = "pb-4">Your serach image results will be here. Take your pick!</p>
                      <div class = "flex flex-row  items-end justify-start grid grid-cols-4 col-gap-5 row-gap-5 grid-rows-2">
                        {this.state.images.map(movieEntry =>    
                          <div class={this.state.movieImage === (movieEntry.image) ? "border-yellow-400 border-solid border-4" : null }> <img class = "h-30 w-30 hover:opacity-75 focus:shadow-outline" src={movieEntry.image} alt= {movieEntry.title} onClick = {() => this.handleImgClick(movieEntry.image, movieEntry.id, movieEntry.title)}/> </div>
                        )}
                      </div>
                  </div>
                  <div class = "flex border-8 border-green-800 pt-8 pb-8 h-auto "> 
                      <p class ="pb-4">Your specific serach image results will be here. Take your pick!</p>
                      <div class="flex flex-row  items-end justify-between grid grid-cols-4 col-gap-5 row-gap-5 grid-rows-2">
                        {this.state.specificImages.map(movieImageEntry =>    
                          <div class={this.state.imagesToStore.includes(movieImageEntry.image) ? "border-yellow-400 border-solid border-4" : null }><img class = " hover:opacity-75 focus:shadow-outline" src={movieImageEntry.image} onClick = {() => this.handleSpecificImgClick(movieImageEntry.image)}/></div>
                        )}
                      </div>
                  </div>
              </div>
          </div>
      
      </div>
        );
    }
}
export default Editor;
