require('dotenv').config()


let baseURL = 'https://api.themoviedb.org/3/';
let configData = null;
let baseImageURL = null;
const APIKEY = process.env.REACT_APP_MOVIEDB_API_KEY;

let getConfig = function () {
    let url = "".concat(baseURL, 'configuration?api_key=', APIKEY); 
    fetch(url)
    .then((result)=>{
        return result.json();
    })
    .then((data)=>{
        baseImageURL = data.images.secure_base_url;
        configData = data.images;
        // console.log('config:', data);
        // console.log('config fetched');
        searchMoviesByKeyword('parasite')
    })
    .catch(function(err){
        alert(err);
    });
}

let getPosterPathofMovie = function (keyword) {
    let url = ''.concat(baseURL, 'search/movie?api_key=', APIKEY, '&query=', keyword, '&page=1');
    fetch(url)
    .then(result=>result.json())
    .then((data)=>{
        data.results.sort(function(a, b) {
            return -(parseFloat(a.popularity) - parseFloat(b.popularity));
        });
        //process the returned data
        console.log(data)
        let posterPath = data.results[0].poster_path;
        console.log('https://image.tmdb.org/t/p/w500' + posterPath)
        
    })
}

let searchMoviesByKeyword = function (keyword) {
    let url = ''.concat(baseURL, 'search/movie?api_key=', APIKEY, '&query=', keyword, '&page=1');
    fetch(url)
    .then(result=>result.json())
    .then((data)=>{
        data.results.sort(function(a, b) {
            return -(parseFloat(a.popularity) - parseFloat(b.popularity));
        });
        //process the returned data
        console.log(data)
        // var i;
        // for (i = 0; i < 10; i++) {
        //     let movieResults = data.results[i].title + " " + data.results[i].release_date;
        //     console.log(movieResults)
        // }
        let movieResults = data.results['title']
        console.log(movieResults)
        
    })
}

let searchTrendingMovies = function () {
    let url = ''.concat(baseURL, 'trending/movie/week?api_key=', APIKEY);
    fetch(url)
    .then(result=>result.json())
    .then((data)=>{
        // console.log(data.results)
        return data.results;
    })
}


export default searchTrendingMovies;
