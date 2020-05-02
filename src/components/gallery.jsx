import React, { Component } from 'react';
import firebase from '../firebaseConfig'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import Movie from './movie'


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
                    id: data.key,
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

    handleMovieClick = (id) => {
        console.log(id);
        //TODO: route to movie

    }

    render() {
        return (
            <Router>
                <div class="grid grid-cols-4 col-gap-20 row-gap-10 grid-rows-2">
                    {this.state.cards.map(movieEntry =>
                        <div class="flex flex-col cursor-pointer justify-center" onClick={() => this.handleMovieClick(movieEntry.id)}>
                            <img class="w-full" src={movieEntry.coverImageURL} alt={movieEntry.name} />
                            <p class="w-full text-center text-sm font-montserrat select-none">{movieEntry.name}</p>
                        </div>
                    )}
                </div>
                <Switch>
                    {/* TODO: create route to movie page */}
                    {/* <Route path="/movies/:movieid" exact strict render={({ match }) => <Movie />} /> */}
                </Switch>
            </Router>
        );
    }

}

export default Gallery;