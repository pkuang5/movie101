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
      if (this.state.change) {
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
          <div class="flex flex-col font-montserrat w-screen items-center mt-3">
          <div class = "w-2/3  items-center">
          
          <div class="flex grid grid-cols-2 gap-4">
          {/* left half */}
          <div class = " h-16  pt-8">
              <p class="font-serif text-3xl font-bold ">Editor</p>
              <p class="font-serif  font-bold pb-4">Fill in the information, search, and submit!</p>
              <div class = "pt-2 grid grid-cols-3 gap-2 ">  
                  <div class>
                      <p>Title</p>
                      <DropSearch getMovieInfo = {this.getMovieInfo} onChange = {(e) => this.setState({ movieName: e.target.value, change: true}) } onChange2 = {(e, date) => this.setState({movieName: e, change: true, movieYear: date})}></DropSearch>
                  </div>
                  <div>
                      <p>Date</p>
                      <input onChange = {(e) => this.setState({ movieYear: e.target.value, change: true})} class= "text-sm border-solid border-2 border-color-beige w-11/12 py-2 px-4 rounded"  type="text" placeholder={this.state.movieYear}/>
                  </div>
                  <div>
                      <p>Search</p>
                      <button onClick = {() => this.getMovieInfo(this.state.movieName)}class= "text-sm border-solid border-2 border-color-beige  py-2 px-4 rounded" type="button">
                        Search: 
                      </button>
                  </div>
              </div>
              <div class = "pt-8  w-full h-48 pb-4 items-center ">
                  <p>Review</p>
                  <input onChange = {(e) => this.setState({ movieReview: e.target.value, change: true})} class="text-sm border-solid border-2 border-color-beige  py-2 px-4 rounded w-11/12 pr-8 h-full" id="grid-password"  placeholder="Description"/>
              </div>
              <div class = "pt-8  h-48">
              <div class = "pt-2 grid grid-cols-3 gap-2 "> 
                  <div>
                      <p>Rate</p>
                      <select onChange = {(e) => this.setState({ movieRating: e.target.value, change: true})} class="text-sm border-solid border-2 border-color-beige  py-2 px-4 rounded w-20 h-12" id="grid-state">
                        <option>5</option>
                        <option>4</option>
                        <option>3</option>
                        <option>2</option>
                        <option>1</option>
                      </select>
                  </div>
                  <div>
                      <p class ="pl-4">Submit</p>
                      <button onClick = {this.handleSubmit} class= "text-sm border-solid border-2 border-color-beige  py-2 px-4 rounded h-12" type="button">
                        Submit
                      </button>
                  </div>
                  <div class = "items-center">
                      <p class ="text-sm">Publish in Featured</p>
                      <select onChange = {this.handleFeatured} class="text-sm border-solid border-2 border-color-beige  py-2 px-4 rounded h-12 w-24" id="grid-state">
                        <option>Yes</option>
                        <option>No</option>
                      </select>
                  </div>
              </div>
              </div>
          </div>
          {/* right half */}
          <div class = "pt-8">
              <p>Your search image results will be here. Take your pick!</p>
              <div class = "overflow-x-scroll flex flex-no-wrap h-auto border">
                {this.state.images.map(movieEntry =>    
                  <img class ={this.state.movieImage === (movieEntry.image) ? "border-blue-400 border-solid border-4 w-24 m-2 h-32 hover:opacity-75" : "w-24 h-32 m-2"}src={movieEntry.image} alt= {movieEntry.title} onClick = {() => this.handleImgClick(movieEntry.image, movieEntry.id, movieEntry.title)}/>
                )}
              </div>
              <div class = "pt-8"></div>
              <div class = "flex text-sm border-solid border-2 border-color-beige rounded pt-8 pb-8 h-auto "> 
                  <p class = {!this.state.movieImage ? "visible" : "hidden"}>Your specific serach image results will be here. Take your pick!</p>
                  <div class="flex flex-row  items-end justify-between grid grid-cols-5 col-gap-2 row-gap-2 grid-rows-2">
                    {this.state.specificImages.map(movieImageEntry =>    
                      <div class={this.state.imagesToStore.includes(movieImageEntry.image) ? "border-blue-400 border-solid border-4" : null }><img class = "cursor-pointer hover:opacity-75 focus:shadow-outline" src={movieImageEntry.image} onClick = {() => this.handleSpecificImgClick(movieImageEntry.image)}/></div>
                    )}
                  </div>
              </div>
          </div>
      
      </div>
      </div>
          </div>
        );
    }
}
export default Editor;
