import React, { useState, useEffect } from 'react';
import Gallery from './gallery'
import firebase from '../firebaseConfig'
import { findByPlaceholderText } from '@testing-library/react';

function Profile(props) {

    const [id, setId] = useState('')
    const [username, setUsername] = useState('')
    const [profilePicUrl, setProfilePicUrl] = useState('')
    const [bio, setBio] = useState('')
    const [featured, setFeatured] = useState('')
    const [followers, setFollowers] = useState([])
    const [followerCount, setFollowerCount] = useState(0)
    const [following, setFollowing] = useState([])
    const [followingCount, setFollowingCount] = useState(0)
    const [localUser, setLocalUser] = useState(false)
    const [followingBool, setFollowingBool] = useState(false)

    useEffect(() => {   
        setFollowerCount(0)
        setFollowingCount(0)
        setFollowing([])
        setFollowers([])
        firebase.database().ref('users').orderByChild('userName').equalTo(props.username).once("value", (snapshot) => {
            snapshot.forEach(data => {
                if (props.appId === data.key) setLocalUser(true)
                setId(data.key)   
                setUsername(data.val().userName)
                setProfilePicUrl(data.val().profileURL)
                setBio(data.val().bio)
                if (data.val().followers) {
                    Object.keys(data.val().followers).forEach(function(key) {
                        setFollowers(followers => [...followers, key])
                        setFollowerCount(followerCount => followerCount + 1)
                        if (key === props.appId) setFollowingBool(true)
                    });
                }
                if (data.val().following) {
                    Object.keys(data.val().following).forEach(function(key) {
                        setFollowing(following => [...following, key])
                        setFollowingCount(followingCount => followingCount + 1)
                    });
                }
            });
        });
    }, [props.username, followingBool])

    function handleFeatured(bool) {
        setFeatured(bool)
    }

    function followUser(id) {
        firebase.database().ref(`users/${props.appId}/following/${id}`).set(true)
        firebase.database().ref(`users/${id}/followers/${props.appId}`).set(true)
        setFollowingBool(true)
    }

    function unfollowUser(id){
        setFollowingBool(false)
        firebase.database().ref(`users/${props.appId}/following/${id}`).remove()
        firebase.database().ref(`users/${id}/followers/${props.appId}`).remove()
    }

    return (
        <React.Fragment>
            <div class="flex flex-col w-screen items-center pt-24 px-6 sm:-mt-20 bg-brown1 shadow-sm">
                <div class="lg:w-2/3 md:w-4/5 w-full items-center">
                    <div class="flex flex-col items-center pt-6">
                        <div class="font-yeseva text-md flex items-center justify-between w-2/3">
                            {/* <div class="flex flex-col items-center">
                                <p>10</p>
                                <p class="-mt-4">watched</p>
                            </div>
                            <div class="flex flex-col items-center">
                                <p>10</p>
                                <p class="-mt-4">featured</p>
                            </div> */}
                            <div class="flex flex-col items-center">
                                <p>{followingCount}</p>
                                <p class="-mt-4">following</p>
                            </div>
                            <div class="rounded-full h-32 w-32 flex bg-cover" style={{backgroundImage: "url('" + profilePicUrl + "')"}}> </div>
                            <div class="flex flex-col items-center">
                                <p>{followerCount}</p>
                                <p class="-mt-4">followers</p>
                            </div>
                        </div>
                        <p class="text-2xl font-semibold font-montserrat mt-2">{username}</p>
                        <p class="text-xs font-montserrat">{bio}</p>
                        {!localUser && !followingBool ? <button onClick={() => followUser(id)} class="button-color-beige font-montserrat font-semibold text-white py-2 px-4 rounded w-1/4">Follow</button>:null}
                        {!localUser && followingBool ? <button onClick={() => unfollowUser(id)} class="bg-blue-400 font-montserrat font-semibold text-white py-2 px-4 rounded w-1/4">Unfollow</button>: null}
                    </div>
                </div>
            </div>
            <div class="flex flex-col w-screen items-center my-3 px-6">
                <div class="lg:w-2/3 md:w-4/5 w-full">
                    <div class="flex text-lg font-montserrat justify-around select-none mt-3">
                        <div class={featured ? 'border-b font-semibold border-black cursor-pointer' : 'cursor-pointer'} onClick={() => handleFeatured(true)}>Featured</div>
                        <div class={!featured ? 'border-b font-semibold border-black cursor-pointer' : 'cursor-pointer'} onClick={() => handleFeatured(false)}>Journals</div>
                    </div>
                    <Gallery googleId={id} username={username} featured={featured} localUser={localUser}/>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Profile;