import React, { Component } from 'react';
import Card from './card'

function Gallery(props){

    return (
        <div class="grid grid-cols-3 gap-20 bg-grey-100 grid-rows-2">
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
    );

}

export default Gallery;