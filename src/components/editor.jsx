import React, { Component } from 'react';
import firebase from '../firebaseConfig'
import { render } from '@testing-library/react';
import Noty from 'noty'
import 'noty/lib/noty.css'
import 'noty/lib/themes/bootstrap-v4.css'
import 'font-awesome/css/font-awesome.min.css'
import {Link} from 'react-router-dom'
import Switch from "react-switch";
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
           specificImages: [],
           imagesToStore: [],
           checked: true,
           previewRating: 5,
           presentDay: ''
           
        };
   }
   componentDidMount = () => {
    this.setState({presentDay: this.getCurrentDate('/')})
   }
  
   fiveStar = () => {
    const stars = []
    for (let i = 0; i < this.state.previewRating; i++) {
        stars.push(<i class="fa fa-star fa-2x text-blue-300 pr-1 cursor-pointer" onMouseOver={() => this.setState({previewRating:(i+1)})} onMouseLeave={() => this.setState({previewRating:(this.state.movieRating)})} onClick={() => this.setState({movieRating:(i+1),previewRating:(i+1), change: true})}></i>)
    }
    for (let i = this.state.previewRating; i < 5; i++) {
        stars.push(<i class="fa fa-star fa-2x text-gray-300 pr-1 cursor-pointer" onMouseOver={() => this.setState({previewRating:(i+1)})} onMouseLeave={() => this.setState({previewRating:(this.state.movieRating)})} onClick={() => this.setState({movieRating:(i+1),previewRating:(i+1), change: true})} ></i>)
    }
    return stars
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
    getCurrentDate = (separator='') => {

      let newDate = new Date()
      let date = newDate.getDate();
      let month = newDate.getMonth() + 1;
      let year = newDate.getFullYear();
      
      return `${month<10?`0${month}`:`${month}`}${separator}${date}${separator}${year}`

      }
    getMovieInfo = (title, id) => {
      if (this.state.change) {
        this.setState({images: []})
        this.setState({specificImages: []})
        let url = ''.concat('https://api.themoviedb.org/3/', 'search/movie?api_key=', process.env.REACT_APP_MOVIEDB_API_KEY, '&query=', title);
        fetch(url).then(result=>result.json()).then((data)=>{
                var i
                for (i in data.results) {
                  let movieEntry = {
                    image: ('https://image.tmdb.org/t/p/w500'+data.results[i].poster_path),
                    title: data.results[i].title,
                    id: data.results[i].id
                  }
                  if (movieEntry.id === id && movieEntry.image === 'https://image.tmdb.org/t/p/w500null'){
                    this.setState({
                      movieImage: "http://pngimg.com/uploads/mario/mario_PNG53.png",
                      movieId: movieEntry.id
                    })
                  }
                  else if (movieEntry.id === id) {
                    this.setState({
                      movieImage: movieEntry.image,
                      movieId: movieEntry.id
                    })
                  }
                }
                this.getMovieImage(id)
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
                dateOfEntry: this.state.presentDay,
                rating: this.state.movieRating,
                description: this.state.movieReview,
                featured: this.state.featured,
                images: this.state.imagesToStore,
                movieYear: this.state.movieYear
            })  
        }
        this.setState({movieRating: '5'})
    }
    handleFeatured = (e) => {
      this.setState({checked: !this.state.checked})
      if (this.state.checked === true) {
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
              <div class = "pt-8 grid grid-row-2 ">
                <div class = "grid grid-cols-2 h-64 mb-12">
                  <div class = "w-full h-full pt-8  ">
                        <p class="font-serif text-3xl font-bold pl-20">Editor</p>
                        <div class = "grid grid-cols-2 gap-2 pl-20  ">  
                          <div class = "w-56 border-b border-b-2 border-teal-300">
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
                      <div class = "pt-8  w-full h-64 items-center pl-20">
                          <p class>Review</p>
                          <textarea type = "textarea" onChange = {(e) => this.setState({ movieReview: e.target.value, change: true})} class="whitespace-normal flex-no-wrap text-sm border-2 border-teal-200  pb-24 px-2  w-full pr-8 h-full" placeholder="Description"/>
                      </div>
                </div>
                <div class = "h-full pt-8 pb-8 mb-64 w-full">
                  <div class = " ml-32 h-full w-1/2 border-2 border-teal-200 border-2 bg-cover" style={{backgroundImage: "url('" + this.state.movieImage + "')"}}/>
                      <div class = "pt-8 pl-40">{this.fiveStar()}</div>
                  </div>
                </div>
                <div class = "w-full h-full mt-24 " >    
                  <div class = "flex text-sm border-solid border-2 border-teal-200  p-2 bg-gray-200 mt-24 h-auto w-4/5 ml-20">
                    <div class="overflow-auto justify-between grid grid-cols-3 gap-8 cursor-pointer ">
                      {this.state.specificImages.map(movieImageEntry =>    
                        <div class = "hover:opacity-75 transition ease-in-out duration-200 transform hover:-translate-y-1 hover:scale-105">
                          <img class={this.state.imagesToStore.includes(movieImageEntry.image) ? " border-blue-400 border-solid border-4 " : null }src={movieImageEntry.image} onClick = {() => this.handleSpecificImgClick(movieImageEntry.image)}></img>
                        </div>
                      )}
                    </div>
                 </div>
                  <div class = "flex grid grid-cols-3 pl-8 items-end ml-20 w-4/5 pt-2">
                    <div class = "">
                      <p class = "pt-2 pl-12">Date</p>
                      <input onChange = {(e) => this.setState({ presentDay: e.target.value, change: true,})} class= "w-3/5 h-12 text-lg  py-2 px-4 border-b border-b-2 border-teal-300"  type="text" placeholder={this.state.presentDay}/>
                  </div>
                  <Link to = {this.state.change?this.props.username + '/movies/' + this.state.movieId:'/editor'}>
                    <button onClick = {this.handleSubmit} class= "hover:opacity-75 text-sm border-2 border-teal-200  py-2 px-4 w-11/12  h-12" type="button">
                        Submit
                    </button>
                  </Link>
                  <div class = "w-full items-center ml-16 ">
                      <label>
                          <p class = "pl-2 ">Featured?</p>
                          <div class = " px-2">
                             <Switch onChange={this.handleFeatured} checked={this.state.checked} onColor = "#1E90FF" height = {36} width = {88}/>
                          </div>
                      </label>
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

