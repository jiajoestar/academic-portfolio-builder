import React, { useState } from 'react';
import './LoginSignUp.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Navbar from '../Home/Navbar';

const Login = () => {

    return (
        <div className="login-page">
            <Navbar />
            <div className="login-container">
                <div className="login-box">
                    <div className="header">
                        <h2>Log In</h2>
                    </div>
                    <div className="inputs">
                        <div className="input">
                            {/*icon*/}
                            <input type="email" placeholder='Email address'/>
                        </div>
                        <div className="input">
                            {/*icon*/}
                            <input type="password" placeholder='Password'/>
                        </div>
                    </div>
                    <button className="login-button">Log in</button>
                    <div className="forgot-password">Forgot your password? <span><Link to='/forgot-password'>Click here</Link></span></div>
                    <div className="forgot-password">Don't have an account with us? <span><Link to='/register'>Register here</Link></span></div>
                </div>
            </div>
        </div>
    );
}

export default Login
