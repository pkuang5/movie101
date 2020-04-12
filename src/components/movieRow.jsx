import React, { Component } from 'react';

class MovieRow extends Component {
    state = {  }
    render() {
        return (
            <React.Fragment>
                <p class="pb-1 font-montserrat border-b border-black "> POPULAR FILMS </p>
                <div class="flex flex-wrap justify-between mt-3">
                    <div class="flex text-gray-700 text-center bg-gray-400  w-32 h-auto"><img src="https://m.media-amazon.com/images/M/MV5BNjgwNjkwOWYtYmM3My00NzI1LTk5OGItYWY0OTMyZTY4OTg2XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg" alt="Portrait of a Lady on Fire" /></div>
                    <div class="flex text-gray-700 text-center bg-gray-400  w-32 h-auto"><img src="https://m.media-amazon.com/images/M/MV5BNjgwNjkwOWYtYmM3My00NzI1LTk5OGItYWY0OTMyZTY4OTg2XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg" alt="Portrait of a Lady on Fire" /></div>
                    <div class="flex text-gray-700 text-center bg-gray-400  w-32 h-auto"><img src="https://m.media-amazon.com/images/M/MV5BNjgwNjkwOWYtYmM3My00NzI1LTk5OGItYWY0OTMyZTY4OTg2XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg" alt="Portrait of a Lady on Fire" /></div>
                    <div class="flex text-gray-700 text-center bg-gray-400  w-32 h-auto"><img src="https://m.media-amazon.com/images/M/MV5BNjgwNjkwOWYtYmM3My00NzI1LTk5OGItYWY0OTMyZTY4OTg2XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg" alt="Portrait of a Lady on Fire" /></div>
                    <div class="flex text-gray-700 text-center bg-gray-400  w-32 h-auto"><img src="https://m.media-amazon.com/images/M/MV5BNjgwNjkwOWYtYmM3My00NzI1LTk5OGItYWY0OTMyZTY4OTg2XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg" alt="Portrait of a Lady on Fire" /></div>
                </div>
            </React.Fragment>
        );
    }
}

export default MovieRow;