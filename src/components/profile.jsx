import React, { useState, useEffect } from 'react';
import Gallery from './gallery'
import firebase from '../firebaseConfig'

function Profile(props) {

    const [id, setId] = useState('')
    const [username, setUsername] = useState('')
    const [profilePicUrl, setProfilePicUrl] = useState('')
    const [bio, setBio] = useState('')
    const [featured, setFeatured] = useState('')
    const [localUser, setLocalUser] = useState(false)
    const [firstName, setFirst] = useState('')
    const [lastName, setLast] = useState('')

    useEffect(() => {   
         
        var userInfo = firebase.database().ref('users');
        userInfo.orderByChild('userName').equalTo(props.username).once("value", (snapshot) => {
            snapshot.forEach(data => {
                if (props.appId === data.key) setLocalUser(true)
                setId(data.key)   
                setUsername(data.val().userName)
                setProfilePicUrl(data.val().profileURL)
                setBio(data.val().bio)
                setFirst(data.val().firstName)
                setLast(data.val().lastName)
            });
        });
    }, [props.username])

    function handleFeatured(bool) {
        setFeatured(bool)
    }

    return (
        <div class="flex flex-col w-screen items-center mt-3 px-6">
            <div class="lg:w-2/3 md:w-4/5 w-full items-center">
                <div class="flex flex-col items-center pt-6">
                    <div class="rounded-full h-32 w-32 flex bg-cover" style={{backgroundImage: "url('" + profilePicUrl + "')"}}> </div>
                    <p class="text-xl font-montserrat mt-2">{username}</p>
    <p class="text-lg font-montserrat mt-2">{firstName} {lastName}</p>
                    <p class="text-xs font-montserrat mt-1">{bio}</p>
                </div>
                <div class="flex text-lg font-montserrat justify-around select-none mt-3">
                    <div class={featured ? 'border-b border-black cursor-pointer' : 'cursor-pointer'} onClick={() => handleFeatured(true)}>Featured</div>
                    <div class={!featured ? 'border-b border-black cursor-pointer' : 'cursor-pointer'} onClick={() => handleFeatured(false)}>Journals</div>
                </div>
                <div class="my-3">
                    <Gallery googleId={id} username={username} appId = {props.appId} featured={featured} localUser={localUser}/>
                </div>
            </div>
        </div>
    );
}

export default Profile;