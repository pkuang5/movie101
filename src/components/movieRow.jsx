import React, { Component } from 'react';
import forwardArrow from '../assets/svg/forwardArrow.svg'
import backArrow from '../assets/svg/backArrow.svg'
require('dotenv').config()

class MovieRow extends Component {
    state = {  
        movies: [],
        start: 0,
        end: 5,
    }

    componentDidMount = () => {
        let url = ''.concat('https://api.themoviedb.org/3/', 'trending/movie/week?api_key=', process.env.REACT_APP_MOVIEDB_API_KEY);
        fetch(url).then(result=>result.json()).then((data)=>{
            let stateList = this.state.movies;
            var i;
            for (i in data.results){
                let movieEntry = {
                    title: data.results[i].title,
                    posterImageUrl: 'https://image.tmdb.org/t/p/w500'+data.results[i].poster_path
                }
                stateList.push(movieEntry);
            }
            this.setState({ movies: stateList })
        })
    }

    shiftMovies = (forward) => {
        if (forward && this.state.end<20) this.setState({start: this.state.start+5, end: this.state.end+5})
        if (!forward && this.state.start > 0) this.setState({start: this.state.start-5, end: this.state.end-5})
    }

    render() {
        return (
            <div class="w-full">
                <div class="flex pb-1 font-montserrat border-b border-black justify-between"> 
                    <div>TRENDING FILMS</div>
                    <div className = "flex">
                        <img onClick={() => this.shiftMovies(false)} class= "mr-3 cursor-pointer" src={backArrow}></img>
                        <img onClick={() => this.shiftMovies(true)} class= "cursor-pointer" src={forwardArrow}></img>
                    </div>
                </div>
                <ol class="flex flex-wrap justify-between mt-3">
                    {this.state.movies.slice(this.state.start, this.state.end).map(movieEntry => 
                        <img class= "w-32" src={movieEntry.posterImageUrl} alt={movieEntry.title} />)}
                </ol>
            </div>
        );
    }
}

export default MovieRow;