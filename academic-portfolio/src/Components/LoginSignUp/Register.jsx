import React, { useState } from 'react';
import './LoginSignUp.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Navbar from '../Home/Navbar';

const Register = () => {

    return (
        <div className="login-page">
            <Navbar />
            <div className="login-container">
                <div className="login-box">
                    <div className="header">
                        <h2>Register</h2>
                    </div>
                    <div className="inputs">
                        <div className="input">
                            {/*icon*/}
                            <input type="text" placeholder='First name'/>
                        </div>
                        <div className="input">
                            {/*icon*/}
                            <input type="text" placeholder='Last name'/>
                        </div>
                        <div className="input">
                            {/*icon*/}
                            <input type="email" placeholder='Email address'/>
                        </div>
                        <div className="input">
                            {/*icon*/}
                            <input type="password" placeholder='Password'/>
                        </div>
                    </div>
                    <button className="login-button">Create account</button>
                    <div className="forgot-password">Already have an account with us? <span><Link to='/login'>Log in</Link></span></div>
                </div>
            </div>
        </div>
    );
}

export default Register
