import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import firebase from "firebase";
import '../App.css'
import Login from "./googleLogInBtn"; // need this to use export method for google id
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            fName: '',
            lName: '',
            email: '',
            countries: []
        };
    }
    handleChange(e) {
        this.state.username = e.target.value
        // set the changed state
        this.setState({ username: this.state.username })


    }
    handleFirstName(e) {
        this.state.fName = e.target.value
        // set the changed state
        this.setState({ fName: this.state.fName })
    }
    handleLastName(e) {
        this.state.lName = e.target.value
        // set the changed state
        this.setState({ lName: this.state.lName })
    }
    handleEMAIL(e) {
        this.state.email = e.target.value
        // set the changed state
        this.setState({ email: this.state.email })
    }

    handleRemove(index) {
        // remove an item at the index
        this.state.countries.splice(index, 1)
        console.log(this.state.countries, "$$");
        // update the state
        this.setState({ countries: this.state.countries })
    }

    handleSubmit(e) {
        //var myModule = require('./googleLogInBtn'); returns undefined
        //var googleId = myModule.googleId;
        //console.log(this.state, googleId)
        // send this to the http request
        firebase
            .database()
            .ref("users/" + 1234) // hard code id
            .update({  
                userName: this.state.username,
                FirstName: this.state.fName,
                LastName: this.state.lName,
                email: this.state.email
            });
        console.log(this.state.username);
        console.log(this.state.fName);
        console.log(this.state.lName);
        console.log(this.state.email);
    }


    render() {
        return (
            
            <div class="flex justify-center pt-3 w-full">
                <h1>PROFILE PAGE</h1>
                <label>Username</label>
                {
                    <div>
                        <input type="text" onChange={this.handleChange.bind(this)} />

                        <button onClick={(e) => this.handleRemove(e)}>Enter Data to the Left</button>
                    </div>
                }
                <hr />
                <label>First Name</label>
                {
                    <div>
                        <input type="text" onChange={this.handleFirstName.bind(this)} />

                        <button onClick={(e) => this.handleRemove(e)}>Enter Data to the Left</button>
                    </div>
                }
                <hr />
                <label>Last Name</label>
                {
                    <div>
                        <input type="text" onChange={this.handleLastName.bind(this)} />

                        <button onClick={(e) => this.handleRemove(e)}>Enter Data to the Left</button>
                    </div>
                }
                <hr />
                <label>email</label>
                {
                    <div>
                        <input type="text" onChange={this.handleEMAIL.bind(this)} />

                        <button onClick={(e) => this.handleRemove(e)}>Enter Data to the Left</button>
                    </div>
                }
                <hr />
                <button className = "btn-primary" onClick={(e) => this.handleSubmit(e)}>Submit</button>
            </div>
           
        );
    }
}
export default Profile;