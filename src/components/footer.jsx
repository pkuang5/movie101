import React, { useState, useEffect } from 'react'
import firebase from '../firebaseConfig'
import 'noty/lib/noty.css'
import 'noty/lib/themes/bootstrap-v4.css'
import 'font-awesome/css/font-awesome.min.css'
import { useHistory } from 'react-router-dom'


require('dotenv').config()

function Footer (props) {
    let history = useHistory()
    return(
       
        <div class = "flex sm:flex-row flex-col justify-between px-4 py-4 bg-gray-200 border-2 h-24 w-screen">
           
            <h6 class = "cursor-pointer hover:text-blue-600 text-lg" onClick = {() => history.push('/about')}>
                About
            </h6>
            <a href = "mailto:screenbook.pn@gmail.com"class = "cursor-pointer hover:text-blue-600 text-lg">
                Contact Us: screenbook.pn@gmail.com
            </a>
            
        </div>
       
    )
}
export default Footer;