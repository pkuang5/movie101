import React, { Component } from 'react';

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    
    handleClick = () => {
        console.log("card clicked");
    }

    render() {
        const { imageUrl, movieName } = this.props;
        return (
            <div class="flex items-end max-w-sm overflow-hidden cursor-pointer text-transparent hover:text-black justify-center" onClick={this.handleClick}>
                <img class="w-full mb-8" src={imageUrl} alt="Sunset in the mountains"/>
                <p class="absolute text-sm font-semibold font-montserrat font-semibold font-base select-none">{movieName}</p>
            </div>
        );
    }
}

export default Card;