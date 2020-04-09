import React, { Component } from 'react';
import Card from './card'

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div class="w-screen h-full flex justify-center overflow-auto px-56 pt-16">
                <div class="grid grid-cols-3 gap-16 bg-grey-100 grid-rows-2">
                    <Card imageUrl="https://pbs.twimg.com/media/EUxPgs-WoAQLuT5?format=jpg&name=large" movieName="Random Movie Name"/>
                    <Card imageUrl="https://pbs.twimg.com/media/EUxPgs-WoAQLuT5?format=jpg&name=large" movieName="Random Movie Name"/>
                    <Card imageUrl="https://pbs.twimg.com/media/EUxPgs-WoAQLuT5?format=jpg&name=large" movieName="Random Movie Name"/>
                    <Card imageUrl="https://pbs.twimg.com/media/EUxPgs-WoAQLuT5?format=jpg&name=large" movieName="Random Movie Name"/>
                    <Card imageUrl="https://pbs.twimg.com/media/EUxPgs-WoAQLuT5?format=jpg&name=large" movieName="Random Movie Name"/>
                    <Card imageUrl="https://pbs.twimg.com/media/EUxPgs-WoAQLuT5?format=jpg&name=large" movieName="Random Movie Name"/>
                    <Card imageUrl="https://pbs.twimg.com/media/EUxPgs-WoAQLuT5?format=jpg&name=large" movieName="Random Movie Name"/>
                    <Card imageUrl="https://pbs.twimg.com/media/EUxPgs-WoAQLuT5?format=jpg&name=large" movieName="Random Movie Name"/>
                    <Card imageUrl="https://pbs.twimg.com/media/EUxPgs-WoAQLuT5?format=jpg&name=large" movieName="Random Movie Name"/>
                </div>
            </div>
        );
    }
}

export default Gallery;