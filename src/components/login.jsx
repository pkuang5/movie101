import React, { useState, useEffect } from "react";
import GoogleLogInBtn from './googleLogInBtn'
import Images from '../assets/images';
import Introduction from "./introduction"

function Login(props) {

    const [backgroundImage, setBackgroundImage] = useState('')

    useEffect(() => {
        setBackgroundImage(Images[Math.floor(Math.random() * Images.length)])
    }, [])

    return (
        <React.Fragment>
            <div class="flex flex-col h-screen w-screen bg-cover bg-local" style={{backgroundImage: "url('" + backgroundImage + "')"}}>>
                <div class="flex flex-col m-auto h-64 w-70 p-4">
                    <div class="font-serif font-semibold text-6xl tracking-tight text-white">Screenbook</div>
                    <div class="font-montserrat font-semibold text-white text-center">Your personal film capsule</div>
                    <div class="flex justify-center p-12" ><GoogleLogInBtn signInState={props.signInState} /></div>
                </div>
            </div>
            <Introduction />
        </React.Fragment>
    );
}

export default Login; 