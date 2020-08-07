import 'bootstrap/dist/css/bootstrap.css';
import firebase from "firebase";
import '../App.css'
import Noty from 'noty'
import 'noty/lib/noty.css'
import 'noty/lib/themes/bootstrap-v4.css'
import 'font-awesome/css/font-awesome.min.css'
import {storage} from "../firebaseConfig";
import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router'

function Settings (props) {
   
           
    const [username, setUsername] = useState('')
    const [fName, setF] = useState('')
    const [lName, setL] = useState('')
    const [email, setEmail] = useState('')
    const [bio, setBio] = useState('')
    const [url, setUrl] = useState('')
    const [image, setImage] = useState('')
    const [change, setChange] = useState(false)
    const [usernameExists, setUsernameExists] = useState(false)
    const [usernameTitle, setUsernameTitle] = useState('UserName')
    const [usernameOG, setUsernameOG] = useState('')
    const [spaceExists, setSpaceExists] = useState(false)
    let history = useHistory()

    useEffect(() => {
        
        var userInfo = firebase.database().ref('users/' + props.googleId);
        userInfo.once('value', (snapshot) => {
            
            setF(snapshot.val().firstName)
            setL(snapshot.val().lastName)
            setUsername(snapshot.val().userName)
            setEmail(snapshot.val().email)
            setBio(snapshot.val().bio)
            setUrl(snapshot.val().profileURL)
            setUsernameOG(snapshot.val().userName)
        })
       
    }, [props.googleId], [props.signInState])
    function showNotification() {
        new Noty({
            type: 'info',
            theme: 'bootstrap-v4',
            layout: 'bottomRight',
            text: 'You Changes Have Been Saved!',
            timeout: 3000
        }).show()
    }
    function showNotificationForProfilePic() {
        new Noty({
            type: 'info',
            theme: 'bootstrap-v4',
            layout: 'bottomRight',
            text: 'You Profile Picture Has Been Changed!',
            timeout: 3000
        }).show()
    }
    function handleChange(e) {
        if(e.target.files[0]) {
            let image = e.target.files[0];
            const uploadTask = storage.ref(`images/${props.googleId}`).put(image);
            uploadTask.on('state_changed',
            () => {          
                     storage.ref('images').child(props.googleId).getDownloadURL().then(url => {
                        setUrl(url)
                        firebase
                        .database()
                        .ref("users/" + props.googleId) 
                        .update({  
                            profileURL: url,
                        }); 
                    })
                
                });    
            }
            setChange(true)
            showNotificationForProfilePic()
    }
    function handleChangeUserName(e) {
        let spaces = false
        if (e.target.value.indexOf(' ') !== -1) {
            setUsernameTitle('Spaces are restricted')
            setSpaceExists(true)
            spaces = true
        }
        else {
            setSpaceExists(false)
            spaces = false
        }
        let exist = false
        if (e.target.value.length != 0 && e.target.value.length < 15 ) {
            var temp = e.target.value
            firebase.database().ref('users').orderByChild('userName').once("value", snapshot => {
                snapshot.forEach((data) => {
                    let userObject = {
                        username: data.val().userName,
                    }
                    if (userObject.username === temp){
                        exist = true
                    }
                });
                if (exist === true && spaces === false) {
                    setUsernameTitle('UserName already Exists!')
                    setUsernameExists(true)
                    setChange(false)
                }
                else if (exist === false && spaces === false){
                    setUsernameTitle('UserName')
                    setUsernameExists(false)
                    setUsername(temp)
                    setChange(true)
                }
            })
            
        }
    }

    function handleFirstName(e) {
        setF(e.target.value)
        setChange(true)
    }
    function handleLastName (e){
        setL(e.target.value)
        setChange(true)
    }
    function handleEMAIL(e) {
        setEmail(e.target.value)
        setChange(true)
    }
    function handleBio(e) {
        setBio(e.target.value)
        setChange(true)
    }
    function handleSubmit(e) {
        if (change && usernameExists === false && spaceExists === false) {
            showNotification()
            firebase
            .database()
            .ref("users/" + props.googleId) 
            .update({  
                userName: username,
                firstName: fName,
                lastName: lName,
                email: email,
                bio: bio,
            });
        }
    }
    function handleDeleteAccount() {
       
        props.signInState(false, '')
        
        history.push("/")
        
    }
   
    return (
        <form class="w-full flex justify-center">

                <div class="w-11/12 mt-16 sm:mt-2 flex flex-wrap -mx-3  flex justify-center sm:w-1/3 font-montserrat font-semibold " >
                <div class = "flex w-full h-24" >
                    <div class= "flex-grow-0 flex-shrink-0 rounded-full w-24 flex bg-cover justify-center mr-8 pt-8 cursor-pointer bg-white" style={{backgroundImage: "url('" + url + "')"}}> 
                        <label for="imageUpload" class="fa fa-pencil fa-sm rounded-full px-2 pt-2 pb-6 items-center justify-center bg-blue-400 h-2 w-screen ml-20 mt-12 text-lg text-white cursor-pointer"/>
                        <input type = "file" onChange = {(e)=>handleChange(e)} name="file" id="imageUpload"  class = "w-0 h-0 opacity-0" />
                    </div>
                    <div class = "w-4/5 flex ">
                        <div class = " h-18 w-full h-full ">
                            <label class={usernameExists||spaceExists?"text-red-600 tracking-wide text-gray-700 text-sm font-bold mb-3 ": "tracking-wide text-gray-700 text-sm font-bold mb-3"}> {usernameTitle} </label>
                            <input type="text" pattern="[A-Za-z]{3}" maxLength = "15"  onChange={(e)=>handleChangeUserName(e)} class="self-end appearance-none block w-full text-gray-700  border-solid border-2 border-gray-300 rounded  py-3 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder={usernameOG}/>
                        </div>
                    </div>
                </div>
                <div class = "w-full flex justify-start mt-3 ">
                    <div class = "w-full">
                            <label class="text-left font-bold text-gray-700 text-sm  mb-2 " for="grid-bio"> Bio </label>
                            <textarea onChange={(e)=>handleBio(e)} class="resize-none appearance-none block h-24  w-full text-sm text-gray-700 border-solid border-2 border-gray-300 rounded py-2 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder={bio}/>
                    </div>
                </div>
                <div class = "flex w-full">
                    <div class = " w-1/2 mr-2 mb-4">
                        <label class=" tracking-wide text-gray-700 text-sm font-bold mb-2" for="grid-first-name">
                            First Name
                        </label>
                        <input onChange={(e)=>handleFirstName(e)} class="appearance-none block w-full  text-gray-700 border-solid border-2 border-gray-300 rounded py-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder={fName}/>
                    </div>
                    <div class = "w-1/2 ml-2">
                        <label class=" tracking-wide text-gray-700 text-sm font-bold mb-2" for="grid-last-name">
                        Last Name
                        </label>
                        <input onChange={(e)=>handleLastName(e)} class="appearance-none block w-full  text-gray-700 border-solid border-2 border-gray-300 rounded py-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder={lName}/>
                    </div>
                </div>
                <div class = "w-full flex justify-start">
                    <div class = "w-full">
            
                        <label class=" tracking-wide text-gray-700 text-sm font-bold mb-2" for="grid-email"> Email </label>
                        <input onChange={(e)=>handleEMAIL(e)} class="appearance-none block w-full  text-gray-700 border-solid border-2 border-gray-300 rounded py-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text"  placeholder={email}/>
                    </div>
                </div>
                <div class = "flex flex-col mt-6 w-full items-center">
                    <button  onClick={(e) => handleSubmit(e)} class="hover:bg-orange-200  w-1/2 text-sm border-solid border-2 border-color-beige  py-2 px-4 rounded " type="button">
                        Save Changes
                    </button>
                    <button class="w-full mt-48  hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border-2 border-red-500 hover:border-transparent rounded" onClick = {()=> {
                        props.signInState(false, '')
                        history.push("/")
                        firebase.database().ref('users/' + props.googleId).remove()
                        }}>
                        Delete Account
                    </button>
                </div>
            </div>
        </form> 
    );
}

export default Settings;