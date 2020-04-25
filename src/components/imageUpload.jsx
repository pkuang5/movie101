import React, { Component } from 'react';
import {storage} from "../firebaseConfig";
import firebase from 'firebase'

class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            url: '',
            progress: 0
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleUpload = this.handleUpload.bind(this)
    }
    handleChange = e => {
        if(e.target.files[0]) {
            const image = e.target.files[0];
            console.log(image);
            this.setState(() => ({image}));
        }
    }
    handleUpload = () => {
        const {image} = this.state;
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on('state_changed',
        (snapshot) => {
            // progress function ...
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            this.setState({progress})
        }, 
        (error) => {
            // error function
            console.log('error')
        }, 
        () => {
                // complete function
                storage.ref('images').child(image.name).getDownloadURL().then(url => {
                    console.log(url);
                    this.setState({url})
                    firebase
                    .database()
                    .ref("users/" + localStorage.getItem('id')) 
                    .update({  
                        profileURL: this.state.url,


            });
                })
            
        });
       
       
            console.log('your url is', this.state.url);
    }
    render () {
        const style = {
            height: '100vh',
            display: 'flex',
            flexDirecttion: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        };
        return (
            <div style = {style}>
                <progress value = {this.state.progress} max = "100"/>
                <input type = "file" onChange = {this.handleChange}/>
                <button onClick = {this.handleUpload}>Upload</button>
                <br/>
                <img src = {this.state.url || 'http://via.placeholder.com/400x300'} alt = "uploaded image" height = "150" width = "150"/>
                
            </div>
            
        )
    }
}
export default ImageUpload; 