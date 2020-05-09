import React, { useState, useEffect } from 'react';
import firebase from '../firebaseConfig'

function Discover(props) {

    const [users, setUsers] = useState([])
    
    useEffect(() => {
        firebase.database().ref('users').once("value", (snapshot) => {
            snapshot.forEach((data) => {
                let userObject = {
                    username: data.val().userName,
                    bio: data.val().bio,
                    profilePicURL: data.val().profileURL
                }
                setUsers(users => [...users,userObject])
            });
        });
    } ,[]);

    return (
        <div class="flex flex-col mt-8 ml-8 font-montserrat">
            <p class="text-xl font-semibold">Discover fellow users!</p>
            {users.map(user => 
                <div class="flex w-full border h-32 mb-3 pl-3">
                    <div class="self-center rounded-full h-24 w-24 flex bg-cover" style={{backgroundImage: "url('" + user.profilePicURL + "')"}}> </div>
                    <div class="flex flex-col pl-4 pt-3">
                        <p class="text-md">{user.username}</p>
                        <p class="text-xs">{user.bio}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Discover;