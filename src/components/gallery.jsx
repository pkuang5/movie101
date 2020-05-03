import React, { Component } from 'react';
import Card from './card'
import firebase from '../firebaseConfig'


class Gallery extends Component {

    state = {
        numberOfcards: 0,
        cards: [],
    }

    firebaseCall = () => {
        let temp = this.state.cards;
        var userInfo = firebase.database().ref('users/' + this.props.googleId + '/journals')
        userInfo.on('value', (snapshot) => {
            snapshot.forEach((data) => {
                let movie = {
                    name: data.val().name,
                    coverImageURL: data.val().coverImage
                }
                temp.push(movie);
            });
        })
        this.setState({ cards: temp })
    }
    //sample firebase function to create movie entry
    sendSampleMovieEntry = (movieID) => {
        firebase.database().ref('users/' + this.props.googleId + '/journals/' + movieID).set({
            name: 'sample name',
            coverImage: 'https://ih1.redbubble.net/image.1070926604.0419/flat,750x1000,075,f.jpg',
            dataOfEntry: '04-20-2020',
            rating: '10/10',
            description: 'great movie'
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.googleId !== this.props.googleId) {
            this.firebaseCall();
        }
    }

    render() {
        return (
            <div class="grid grid-cols-3 gap-20 grid-rows-2">
                {this.state.cards.map(movieEntry => <Card imageUrl={movieEntry.coverImageURL} movieName={movieEntry.name} />)}
            </div>
        );
    }

}

export default Gallery;