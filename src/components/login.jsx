import React, { useState, useEffect } from "react";
import GoogleLogInBtn from './googleLogInBtn'
import Images from '../assets/images';
import Introduction from "./introduction"
import Footer from "./footer"

function Login(props) {

    const [backgroundImage, setBackgroundImage] = useState('')

    useEffect(() => {
        setBackgroundImage(Images[Math.floor(Math.random() * Images.length)])
    }, [])

    return (
        <React.Fragment>
            <div class="flex h-screen w-screen items-center justify-center bg-cover bg-local bg-center" style={{backgroundImage: "url('" + backgroundImage + "')"}}>
                <div class="flex flex-col text-center">
                    <p class="font-serif font-semibold md:text-6xl text-5xl text-white">Screenbook</p>
                    <div class="font-montserrat font-semibold text-white">Your personal film capsule</div>
                    <div class="flex justify-center p-12" ><GoogleLogInBtn signInState={props.signInState} /></div>
                </div>
            </div>
            <Introduction />
            <Footer/>
        </React.Fragment>
    );
}

export default Login; 