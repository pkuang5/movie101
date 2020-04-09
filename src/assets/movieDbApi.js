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
        console.log('config:', data);
        console.log('config fetched');
        getPosterPathofMovie('parasite')
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

export default getConfig;