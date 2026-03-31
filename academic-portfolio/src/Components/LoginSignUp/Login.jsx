import React, { useState } from 'react';
import './LoginSignUp.css'
import { Link, useNavigate, Navigate } from 'react-router-dom';
import Navbar from '../Home/Navbar';

const Login = () => {
    const navigate = useNavigate()

    const token = localStorage.getItem('token')

    if (token) {
        return <Navigate to='/dashboard' />
    }

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const handleLogin = async () => {
        try {
            const res = await fetch('http://localhost:5173/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            })

            console.log('Response status:', res.status)
            const data = await res.json()
            console.log('Response data:',data)

            if (res.ok) {
                alert('Log in successful')
                localStorage.setItem('token', data.token)

                const userData = {
                    firstName: 'Troy',
                    lastName: 'Bolton',
                    title: 'Student Athlete',
                    workplace: 'East High',
                    bio: 'Basketball captain and musical star',
                    avatar: 'https://static.wikia.nocookie.net/hsmtmts/images/f/f4/Troy_Bolton.webp/revision/latest?cb=20250518195010'
                }

                localStorage.setItem('user', JSON.stringify(userData))
                console.log('Saved user:', localStorage.getItem('user'))
                navigate('/dashboard')

            } else {
                alert(data.message || 'Log in unsuccessful')
            }
        } catch (err) {
            console.error(err)
            alert('Server error')
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
