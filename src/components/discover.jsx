import React, { useState, useEffect } from 'react';
import firebase from '../firebaseConfig'
import { useHistory } from 'react-router-dom'

function Discover(props) {

    const [users, setUsers] = useState([])
    let history = useHistory();
    
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

    const handleUserClick = (username) => {
        history.push('/' + username)
    }

    return (
        <div class="flex flex-col font-montserrat w-screen items-center mt-3 px-6">
            <div class="lg:w-2/3 md:w-4/5 w-full ">
                <p class="text-2xl font-semibold">Discover fellow users!</p>
                {users.map(user => 
                    <div class="flex w-full h-32 mb-3 px-3 cursor-pointer transition duration-300 hover:bg-gray-100" onClick={() => handleUserClick(user.username)}>
                        <div class="self-center rounded-full h-24 w-24 flex bg-cover" style={{backgroundImage: "url('" + user.profilePicURL + "')"}}> </div>
                        <div class="flex flex-col pl-4 pt-4">
                            <p class="text-md font-semibold">{user.username}</p>
                            <p class="text-xs">{user.bio}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Discover;