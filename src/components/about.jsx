import React, { useState, useEffect } from 'react'
import firebase from '../firebaseConfig'
import Noty from 'noty'
import 'noty/lib/noty.css'
import 'noty/lib/themes/bootstrap-v4.css'
import 'font-awesome/css/font-awesome.min.css'
import { useHistory } from 'react-router-dom'

require('dotenv').config()

function About (props) {

    let history = useHistory()

    return(
        <div class="flex flex-col font-montserrat w-screen items-center mt-3">
            <i class="fa fa-arrow-circle-left fa-2x cursor-pointer" onClick = {() => history.push('/')} ></i>
            <div class = "flex lg:w-2/3 md:w-4/5 w-full items-center">
                <div class = "flex flex-col  px-4 py-8 justify-between  h-24 w-screen ">
                    <div class = "flex bg-gray-200 text-5xl pb-4">
                        About
                    </div>
                    <div class = "flex flex-col ">
                        <div class = "bg-gray-200">
                            <div class = "text-4xl">
                                Our Mission
                            </div>
                            <p class = "pt-2">
                                Screenbook was developed with the intention of providing a new platform for people 
                                to connect through similar interests, such as movies!
                            </p>
                        </div>
                        <div class = "bg-gray-200 ">
                            <div class = "text-4xl">
                                Who we are
                            </div>
                            <p class = "pt-2">
                                We are two second-year college students from the bay area that are both studying computer science.
                                Our interest and passion for software developement has led us to 
                                exploring a wide range of computer science applications. 
                            </p>
                        </div>
                        <div class = "bg-gray-200 ">
                            <div class = "text-4xl">
                                Contact Us
                            </div>
                            <div class = "pt-2">
                                <p class = "font-semibold">
                                    Feedback is appreciated! Reach us here:
                                </p>
                                <a href = "mailto:screenbook.pn@gmail.com">
                                    screenbook.pn@gmail.com
                                </a>
                                <div class = "py-2"/>
                                <p class = "font-semibold">
                                    Screenbook Developers:
                                </p>
                                {/* <div class = "text-4xl">
                                    Screenbook, a project developed by:
                                </div> */}
                                <div class = "flex flex-col "> 
                                    <a href = "https://www.linkedin.com/in/nateelee/">
                                        Nathaniel Lee
                                    </a>
                                    <div class = "py-2"/>
                                    <a href = "mailto:naelee@ucsc.edu">
                                        naelee@ucsc.edu
                                    </a>
                                    <div class = "py-2"/>
                                </div>
                                <div class = "flex flex-col "> 
                                    <a href = "https://www.linkedin.com/in/patrick-kuang-70656417a/">
                                        Patrick Kuang
                                    </a>
                                    <div class = "py-2"/>
                                    <a href = "mailto:pkuang@ucsb.edu">
                                        pkuang@ucsb.edu
                                    </a>
                                    <div class = "py-2"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    
}
export default About;