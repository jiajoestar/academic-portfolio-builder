import React, { useState } from 'react'
import './LoginSignUp.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

const SignUp = () => {

    return (
        <div className='container'>
            <div className='header'>
                <div className='text'>Sign Up</div>
            </div>
            <div className='inputs'>
                <div className='input'>
                    {/*icon*/}
                    <input type="text" placeholder='Name'/>
                </div>
                <div className='input'>
                    {/*icon*/}
                    <input type="email" placeholder='Email address'/>
                </div>
                <div className='input'>
                    {/*icon*/}
                    <input type="password" placeholder='Password'/>
                </div>
            </div>
        </div>
    )
}

export default SignUp
