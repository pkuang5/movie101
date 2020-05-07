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
                console.log(i)
                let movieEntry = {
                    title: data.results[i].title,
                    posterImageUrl: 'https://image.tmdb.org/t/p/w500'+data.results[i].poster_path
                }
                stateList.push(movieEntry);
            }
            this.setState({ movies: stateList })
        })
    }

    backClicked = () => {
        if (this.state.start > 0) this.setState({start: this.state.start-5, end: this.state.end-5})
    }

    forwardClicked = () =>{
        if (this.state.end<20) this.setState({start: this.state.start+5, end: this.state.end+5})
    } 
    render() {
        return (
            <React.Fragment>
                <div class="flex pb-1 font-montserrat border-b border-black justify-between"> 
                    <p>TRENDING FILMS</p>
                    <div className = "flex">
                        <img onClick={this.backClicked} class= "mr-3 cursor-pointer" src={backArrow}></img>
                        <img onClick={this.forwardClicked} class= "cursor-pointer" src={forwardArrow}></img>
                    </div>
                </div>
                <ol class="flex flex-wrap justify-between mt-3">
                    {this.state.movies.slice(this.state.start, this.state.end).map(movieEntry => 
                        <div class="flex flex-col w-32 h-auto items-end justify-start">
                            <img src={movieEntry.posterImageUrl} alt={movieEntry.title} />
                            <p class="w-full text-center text-xs font-montserrat mt-2">{movieEntry.title}</p>
                        </div>)}
                </ol>
            </React.Fragment>
        );
    }
}

export default MovieRow;