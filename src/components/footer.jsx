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
       
        <div class = "flex flex-row justify-between px-4 py-8 bg-gray-200 border-2 h-24 w-screen">
            <button class = "" onClick = {() => history.push('/about')}>
                About
            </button>
            <h6 class = "">
                Contact Us: pn@gmail.com
            </h6>
        </div>
       
    )
}
export default Footer;