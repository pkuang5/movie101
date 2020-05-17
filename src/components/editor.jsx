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
              <div class = " h-16  pt-8 ">
                  <p class="font-serif text-3xl font-bold ">Editor</p>
                  <p class="font-serif  font-bold pb-2">Fill in the information, search, and submit!</p>
                  <div class = "grid grid-cols-2 gap-2   ">  
                      <div class = "w-64 border-b border-b-2 border-gray-600">
                          <p>Title</p>
                          <DropSearch getMovieInfo = {this.getMovieInfo} onChange = {(e) => this.setState({ movieName: e.target.value, change: true}) } onChange2 = {(e, date) => this.setState({movieName: e, change: true, movieYear: date})}></DropSearch>
                      </div>
                      <div class = "w-8 h-4 pt-12 pl-4">
                        <svg onClick = {() => this.getMovieInfo(this.state.movieName)} class = "cursor-pointer" width="30" height="30" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" />
                          <circle cx="20.5" cy="17.5" r="10.5" stroke="black" stroke-width="2" />
                          <line x1="28.1584" y1="25.244" x2="37.256" y2="34.3417" stroke="black" stroke-width="2" stroke-linecap="round" />
                        </svg>
                      </div>
                  </div>
                  <div class = "pt-8  w-full h-48 pb-4 items-center ">
                      <p class>Review</p>
                      <textarea type = "textarea" onChange = {(e) => this.setState({ movieReview: e.target.value, change: true})} class="whitespace-normal flex-no-wrap text-sm border-2 border-gray-600  pb-24 px-2  w-11/12 pr-8 h-full" placeholder="Description"/>
                  </div>
                  <div class = "pt-8  h-48">
                  <div class = "pt-2 grid grid-cols-3 gap-2 w-11/12"> 
                      <div class = "w-2/3 ">
                          <p>Rate</p>
                          <select onChange = {(e) => this.setState({ movieRating: e.target.value, change: true})} class="w-full text-sm border-b border-b-2 border-gray-600  py-2 px-4  w-20 h-12">
                            <option>5</option>
                            <option>4</option>
                            <option>3</option>
                            <option>2</option>
                            <option>1</option>
                          </select>
                      </div>
                      <div class = " w-full ">
                          <p>Date</p>
                          <input onChange = {(e) => this.setState({ movieYear: e.target.value, change: true})} class= "w-full h-12 text-sm  w-11/12 py-2 px-4 border-b border-b-2 border-gray-600"  type="text" placeholder={this.state.movieYear}/>
                      </div>
                      <div class = "items-center ml-10">
                          <p class ="">Featured?</p>
                          <select onChange = {this.handleFeatured} class="w-full text-sm  py-2 px-4  h-12 w-24 border-b border-b-2 border-gray-600">
                            <option>Yes</option>
                            <option>No</option>
                          </select>
                      </div>
                  </div>
                  <div class = "pt-4">
                          <button onClick = {this.handleSubmit} class= "text-sm border-2 border-gray-600  py-2 px-4 w-11/12  h-12" type="button">
                            Submit
                          </button>
                  </div>
               </div>
            </div>
            {/* right half */}
            <div class = "pt-8">
                <p>Your search image results will be here. Take your pick!</p>
                <div class = "overflow-x-scroll flex flex-no-wrap border h-48 p-2 ">
                  {this.state.images.map(movieEntry =>    
                    <img class ={this.state.movieImage === (movieEntry.image) ? "border-blue-400 border-solid border-4 w-32 m-2 h-40 hover:opacity-75" : "w-32 h-40 m-2"}src={movieEntry.image} alt= {movieEntry.title} onClick = {() => this.handleImgClick(movieEntry.image, movieEntry.id, movieEntry.title)}/>
                  )}
                </div>
                <div class = "pt-8"></div>
                <p>Your specific serach image results will be here. Take your pick!</p>
                <div class = "flex text-sm border-solid border-2 border-color-gray  p-2 h-64"> 
                    <div class="overflow-auto justify-between grid grid-cols-3 col-gap-2 row-gap-2">
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
