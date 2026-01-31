import React, { useState } from 'react'
import './LoginSignUp.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

const LoginSignUp = () => {

    const [action, setAction] = useState("Sign Up");

    return (
        <div className='container'>
            <div className='header'>
                {/*title changes depending on the page*/}
                <div className='text'>{action}</div>
            </div>
            <div className='inputs'>
                {/*name field only shows for the signup page*/}
                {action==="Login"?<div></div>:<div className='input'>
                    {/*icon*/}
                    <input type="text" placeholder='Name'/>
                </div>}
                <div className='input'>
                    {/*icon*/}
                    <input type="email" placeholder='Email address'/>
                </div>
                <div className='input'>
                    {/*icon*/}
                    <input type="password" placeholder='Password'/>
                </div>
            </div>
            {/*'forgot password' link only shows for the login page*/}
            {action==="Sign Up"?<div></div>:<div className='forgot-password'>Forgot your password? <span>Click here</span></div>}
            <div className='submit-container'>
                <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
                <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Log In</div>
            </div>
        </div>
    )
}

export default LoginSignUp
