import React, { useState, useEffect } from 'react';
import Gallery from './gallery'
import firebase from '../firebaseConfig'
import { useHistory } from 'react-router-dom'

function Profile(props) {

    let history = useHistory()

    const [id, setId] = useState('')
    const [username, setUsername] = useState('')
    const [profilePicUrl, setProfilePicUrl] = useState('')
    const [bio, setBio] = useState('')
    const [featured, setFeatured] = useState(true)
    const [followers, setFollowers] = useState([])
    const [followerCount, setFollowerCount] = useState(0)
    const [following, setFollowing] = useState([])
    const [followingCount, setFollowingCount] = useState(0)
    const [localUser, setLocalUser] = useState(false)
    const [followingBool, setFollowingBool] = useState(false)
    const [followerPopUp, setFollowerPopUp] = useState(false)
    const [followingPopUp, setFollowingPopUp] = useState(false)
    const [followingStateChanged, setFollowingStateChanged] = useState(true)

    useEffect(() => {   
        setLocalUser(false)
        firebase.database().ref('users').orderByChild('userName').equalTo(props.username).once("value", (snapshot) => {
            snapshot.forEach(data => {
                if (props.appId === data.key){
                    setLocalUser(true)
                    setFollowingBool(false)
                } 
                setId(data.key)   
                setUsername(data.val().userName)
                setProfilePicUrl(data.val().profileURL)
                setBio(data.val().bio)
                if (followingStateChanged){
                    setFollowerCount(0)
                    setFollowingCount(0)
                    setFollowing([])
                    setFollowers([])
                    if (data.val().followers) {
                        Object.keys(data.val().followers).forEach(function(key) {
                            firebase.database().ref(`users/${key}`).once("value", snapshot => {
                                let user = {
                                    profileUrl: snapshot.val().profileURL,
                                    username: snapshot.val().userName,
                                    bio: snapshot.val().bio
                                }
                                setFollowers(followers => [...followers, user])
                            })
                            setFollowerCount(followerCount => followerCount + 1)
                            if (key === props.appId) setFollowingBool(true)
                        })
                    }
                    if (data.val().following) {
                        Object.keys(data.val().following).forEach(function(key) {
                            firebase.database().ref(`users/${key}`).once("value", snapshot => {
                                let user = {
                                    profileUrl: snapshot.val().profileURL,
                                    username: snapshot.val().userName,
                                    bio: snapshot.val().bio
                                }
                                setFollowing(following => [...following, user])
                            })
                            setFollowingCount(followingCount => followingCount + 1)
                        });
                    }
                    setFollowingStateChanged(false)
                }
            });
        });
    }, [props.username, followingStateChanged])

    function handleFeatured(bool) {
        setFeatured(bool)
    }

    function followUser(id) {
        setFollowingBool(true)
        setFollowingStateChanged(true)
        firebase.database().ref(`users/${props.appId}/following/${id}`).set(true)
        firebase.database().ref(`users/${id}/followers/${props.appId}`).set(true)
    }

    function unfollowUser(id){
        setFollowingBool(false)
        setFollowingStateChanged(true)
        firebase.database().ref(`users/${props.appId}/following/${id}`).remove()
        firebase.database().ref(`users/${id}/followers/${props.appId}`).remove()
    }

    return (
        <React.Fragment>
            <div class="flex flex-col w-screen items-center pt-24 px-6 sm:-mt-20 bg-brown1 shadow-sm">
                <div class="lg:w-2/3 md:w-4/5 w-full items-center">
                    <div class="flex flex-col items-center pt-6">
                        <div class="font-yeseva text-md flex items-center justify-between w-2/3">
                            <div class="flex flex-col items-center shadow-sm p-3 rounded-sm" onClick={() => setFollowingPopUp(true)}>
                                <p>{followingCount}</p>
                                <p class="-mt-4">following</p>
                            </div>
                            <div class="rounded-full h-32 w-32 flex bg-cover" style={{backgroundImage: "url('" + profilePicUrl + "')"}} />
                            <div class="flex flex-col items-center shadow-sm p-3 rounded-sm" onClick={() => setFollowerPopUp(true)}>
                                <p>{followerCount}</p>
                                <p class="-mt-4">followers</p>
                            </div>
                        </div>
                        <p class="text-2xl font-semibold font-montserrat mt-2">{username}</p>
                        <p class="text-xs font-montserrat">{bio}</p>
                        {!localUser && !followingBool ? <button onClick={() => followUser(id)} class="mb-5 button-color-beige font-montserrat font-semibold text-white py-2 px-4 rounded w-1/4">Follow</button>:null}
                        {!localUser && followingBool ? <button onClick={() => unfollowUser(id)} class="mb-5 bg-blue-400 font-montserrat font-semibold text-white py-2 px-4 rounded w-1/4">Unfollow</button>: null}
                    </div>
                </div>
                {followerPopUp || followingPopUp ? <div class="flex w-screen -my-20 h-screen items-center justify-center z-10 absolute overflow-auto">
                    <div class="flex flex-col w-1/2 h-1/2 bg-brown1 rounded-sm shadow-sm overflow-auto">
                        <i class="self-end my-3 fa fa-times fa-lg hover:text-gray-600 cursor-pointer mr-3" onClick={() => {setFollowerPopUp(false); setFollowingPopUp(false)}}/>
                        <div>
                            {followingPopUp ? 
                                following.length !== 0 && following ?
                                following.map(user => 
                                    <div class="w-full h-32" onClick={() => {setFollowingStateChanged(true); history.push(`/${user.username}`); setFollowerPopUp(false); setFollowingPopUp(false);}}>
                                        <div class="flex w-full h-auto p-3 cursor-pointer transition duration-300 hover:bg-gray-100" >
                                            <div class="self-center rounded-full h-24 w-24 flex bg-cover" style={{backgroundImage: "url('" + user.profileUrl + "')"}}> </div>
                                            <div class="flex flex-col pl-4 pt-4">
                                                <p class="text-md font-semibold">{user.username}</p>
                                                <p class="text-xs">{user.bio}</p>
                                            </div>
                                        </div>
                                    </div>):
                                <p>This user is not following anyone</p>    
                            :
                                followers.length !== 0 && followers? 
                                followers.map(user => 
                                    <div class="w-full h-32" onClick={() => {setFollowingStateChanged(true); history.push(`/${user.username}`); setFollowerPopUp(false); setFollowingPopUp(false);}}>
                                        <div class="flex w-full h-auto p-3 cursor-pointer transition duration-300 hover:bg-gray-100" >
                                            <div class="self-center rounded-full h-24 w-24 flex bg-cover" style={{backgroundImage: "url('" + user.profileUrl + "')"}}> </div>
                                            <div class="flex flex-col pl-4 pt-4">
                                                <p class="text-md font-semibold">{user.username}</p>
                                                <p class="text-xs">{user.bio}</p>
                                            </div>
                                        </div>
                                    </div>    
                                ):
                                <p>This user has no followers</p> 
                            }
                        </div>    
                    </div>
                </div>: null}
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