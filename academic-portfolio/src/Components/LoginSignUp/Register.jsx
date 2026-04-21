import React, { useState } from 'react';
import './LoginSignUp.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Home/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Register = () => {
    const navigate = useNavigate()

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/
        return regex.test(password)
    }

    const handleRegister = async () => {
        console.log("Register clicked")

        if (!validatePassword(form.password)) {
            toast.error('Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.')
        }
        
        try {
            const res = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            })

            const data = await res.json()
            console.log(data)

            if (res.ok) {
                toast.success('Account created!')
                navigate("/login")
            } else {
                toast.error(data.message || "Registration failed")
            }
        } catch (err) {
            console.error(err)
            alert("Server error")
        }
        
    }

    return (
        <>
            <ToastContainer />
            <div className="login-page">
                <Navbar />
                <div className="login-container">
                    <div className="login-box">
                        <div className="header">
                            <h2>Register</h2>
                        </div>

                        <form onSubmit={(e) => {
                            e.preventDefault()
                            handleRegister()
                        }}
                        >
                            <div className="inputs">
                                <div className="input">
                                    {/*icon*/}
                                    <input type="text" placeholder='First name' onChange={(e) => setForm({...form, firstName: e.target.value})}/>
                                </div>
                                <div className="input">
                                    {/*icon*/}
                                    <input type="text" placeholder='Last name' onChange={(e) => setForm({...form, lastName: e.target.value})}/>
                                </div>
                                <div className="input">
                                    {/*icon*/}
                                    <input type="email" placeholder='Email address' onChange={(e) => setForm({...form, email: e.target.value})}/>
                                </div>
                                <div className="input">
                                    {/*icon*/}
                                    <input type="password" placeholder='Password' onChange={(e) => setForm({...form, password: e.target.value})}/>
                                </div>
                            </div>
                            <button className="login-button" type='submit'>Create account</button>
                        </form>

                        <div className="forgot-password">Already have an account with us? <span><Link to='/login'>Log in</Link></span></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register
