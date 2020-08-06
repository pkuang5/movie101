import React, { useState, useEffect } from 'react'
import firebase from '../firebaseConfig'
import Noty from 'noty'
import 'noty/lib/noty.css'
import 'noty/lib/themes/bootstrap-v4.css'
import 'font-awesome/css/font-awesome.min.css'
import Switch from "react-switch";
import { useHistory,useLocation, useRef } from 'react-router-dom'
import DropSearch from './dropSearch'
import { render } from '@testing-library/react'

require('dotenv').config()

function About (props) {
    return(
        <div class="flex flex-col font-montserrat w-screen items-center mt-3">
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
                                connect through similar interests, such as movies!
                            </p>
                        </div>
                        <div class = "bg-gray-200 ">
                            <div class = "text-4xl">
                                Who we are
                            </div>
                            <p class = "pt-2">
                                We are two college studens from the bay area and are both studying computer science.
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
                                    Our professional email:
                                </p>
                                <p>
                                    pn@gmail.com
                                </p>
                                <p class = "font-semibold">
                                    Our personal emails:
                                </p>
                                <div class = "flex flex-col "> 
                                    <a href = "mailto:naelee@ucsc.edu">
                                        naelee@ucsc.edu
                                    </a>
                                    <a class = "py-2" href = "mailto:pkuang@ucsb.edu">
                                        pkuang@ucsb.edu
                                    </a>
                                </div>
                                <p class = "font-semibold">
                                    Our LinkedIn Accounts:
                                </p>
                                <div class = "flex flex-col "> 
                                    <a href = "https://www.linkedin.com/in/nateelee/">
                                        https://www.linkedin.com/in/nateelee/
                                    </a>
                                    <a class = "py-2" href = "https://www.linkedin.com/in/patrick-kuang-70656417a/">
                                        https://www.linkedin.com/in/patrick-kuang-70656417a/
                                    </a>
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