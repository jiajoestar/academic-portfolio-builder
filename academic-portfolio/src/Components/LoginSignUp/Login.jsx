import React, { useState } from 'react'
import './LoginSignUp.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

const Login = () => {

    return (
        <div className='container'>
            <div className='header'>
                <div className='text'>Log In</div>
            </div>
            <div className='inputs'>
                <div className='input'>
                    {/*icon*/}
                    <input type="email" placeholder='Email address'/>
                </div>
                <div className='input'>
                    {/*icon*/}
                    <input type="password" placeholder='Password'/>
                </div>
            </div>
            <div className='forgot-password'>Forgot your password? <span><Link to='/forgot-password'>Click here</Link></span></div>
            <div className='forgot-password'>Don't have an account with us? <span>Register here</span></div>
        </div>
    )
}

export default Login
