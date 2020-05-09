import React, { useState, useEffect, useReducer } from 'react';
import firebase from '../firebaseConfig'

function Discover(props) {

    const [users, setUsers] = useState([])
    
    useEffect(() => {
        let temp = []
        firebase.database().ref('users').once("value", (snapshot) => {
            snapshot.forEach((data) => {
                let userObject = {
                    username: data.val().userName,
                    bio: data.val().bio,
                    profilePicURL: data.val().profileURL
                }
                temp.push(userObject)
            });
            setUsers(users.concat(temp))
        });
    } ,[]);

    return (
        <div class="flex flex-col">
            {users.map(user => 
                <div class="w-full border h-32">{user.username} {user.bio} {user.profilePicURL}</div>
            )}
        </div>
    );
}

export default Discover;