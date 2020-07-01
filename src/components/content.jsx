import React, { useEffect, useState } from 'react';
import firebase from '../firebaseConfig'


function Content(props) {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        firebase.database().ref('users/' + props.id + '/following').once('value', (snapshot) => {
            snapshot.forEach(data => {
                firebase.database().ref(`users/${data.key}/journals`).orderByChild('timestamp').startAt(0).once('value', (snapshot) => {
                    snapshot.forEach(data => {    
                        let movie = {
                            id: data.key,
                            name: data.val().name,
                            coverImageURL: data.val().coverImage,
                            timestamp: data.val().timestamp
                        }
                        setPosts(posts => [...posts, movie])
                        setPosts(posts => posts.sort((a,b)=>a.timestamp-b.timestamp))
                    })
                })
            })
        })
    }, [])


    return (
        <div class="flex justify-center w-full">
            <div class="w-1/3">
                {posts.map(post => 
                    <img src={post.coverImageURL} alt="cover image" />
                )}
            </div>
        </div>
    )
}

export default Content;