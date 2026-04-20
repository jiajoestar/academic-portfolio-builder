import React, { useState } from 'react';
import './LoginSignUp.css'
import { Link } from 'react-router-dom';
import Navbar from '../Home/Navbar';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    alert("If that email exists, a reset link has been sent.");
  };

  return (
    <div className='login-page'>
      <Navbar />
      <div className='login-container'>
        <div className='login-box'>
          <div className='header'>
            <h2>Forgot Password</h2>
          </div>

          <form className='inputs' onSubmit={handleSubmit}>
            <div className='input'>
              <input
                type='email'
                placeholder='Enter your email'
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button className='login-button' type='submit'>Send reset link</button>
          </form>

          <div className='forgot-password'>
            Remember your password? <span><Link to='/login'>Log in</Link></span>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword
