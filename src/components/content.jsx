import React, { useEffect, useState } from 'react';
import firebase from '../firebaseConfig'


function Content(props) {

    const [posts, setPosts] = useState([])
    const [currentTimestamp, setCurrentTimestamp] = useState(0)

    useEffect(() => {
        setCurrentTimestamp(getExactDate("/"))
        firebase.database().ref('users/' + props.id + '/following').once('value', (snapshot) => {
            snapshot.forEach(data => {
                firebase.database().ref(`users/${data.key}/journals`).orderByChild('timestamp').startAt(0).once('value', (snapshot) => {
                    snapshot.forEach(data => {    
                        let movie = {
                            id: data.key,
                            name: data.val().name,
                            coverImageURL: data.val().coverImage,
                            timestamp: data.val().timestamp,
                            timeFromCurrent: currentTimestamp-data.val().timestamp
                        }
                        setPosts(posts => [...posts, movie])
                    })
                })
            })
        })
        setPosts(posts => posts.sort((a,b)=>a.timestamp-b.timestamp))
    }, [])

    function getExactDate (separator='') {

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        var hours = new Date().getHours(); //To get the Current Hours
        var min = new Date().getMinutes(); //To get the Current Minutes
        var sec = new Date().getSeconds(); //To get the Current Seconds
        if (month < 10) month = '0' + month
        if(hours<10) hours = '0' + hours
        if(min<10) min= '0' + min
        if(sec<10) sec='0' + sec
        return year + month + date + hours + min + sec
  
    }

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