import React, { Component } from 'react';

class Card extends Component {
    constructor(props) {
        super(props);
        // console.log(props);
        this.state = {
        };
    }
    
    handleClick = () => {
        console.log("card clicked");
    }

    render() {
        const { imageUrl, movieName } = this.props;
        return (
            <div class="flex items-end max-w-sm overflow-hidden cursor-pointer justify-center" onClick={this.handleClick}>
                <img class="w-full mb-8" src={imageUrl} alt="Sunset in the mountains"/>
                <p class="absolute text-sm font-montserrat select-none">{movieName}</p>
            </div>
        );
    }
}

export default Card;