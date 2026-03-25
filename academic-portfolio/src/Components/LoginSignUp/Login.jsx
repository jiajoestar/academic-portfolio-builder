import React, { useState } from 'react';
import './LoginSignUp.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Navbar from '../Home/Navbar';

const Login = () => {

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const handleLogin = async () => {
        const res = await fetch('http://localhost:5173/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        });

        const data = await res.json()
        console.log(data)

        if (res.ok) {
            alert('Log in successful')
            localStorage.setItem('token', data.token)
        } else {
            alert(data.message || 'Log in unsuccessful')
        }
    }

    return (
        <div className="login-page">
            <Navbar />
            <div className="login-container">
                <div className="login-box">
                    <div className="header">
                        <h2>Log In</h2>
                    </div>

                    <form onSubmit={(e)=> {
                        e.preventDefault()
                        handleLogin()
                    }}
                    >
                        <div className="inputs">
                            <div className="input">
                                {/*icon*/}
                                <input type='email' placeholder='Email address' onChange={(e) => setForm({...form, email: e.target.value})}/>
                            </div>
                            <div className="input">
                                {/*icon*/}
                                <input type='password' placeholder='Password' onChange={(e) => setForm({...form, password: e.target.value})}/>
                            </div>
                        </div>
                        <button className="login-button" type='submit'>Log in</button>
                    </form>
                    
                    <div className="forgot-password">Forgot your password? <span><Link to='/forgot-password'>Click here</Link></span></div>
                    <div className="forgot-password">Don't have an account with us? <span><Link to='/register'>Register here</Link></span></div>
                </div>
            </div>
        </div>
    );
}

export default Login
