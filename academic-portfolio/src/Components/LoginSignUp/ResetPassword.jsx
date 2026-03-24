import { useParams } from "react-router-dom";
import { useState } from 'react';
import './LoginSignUp.css'

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:5000/api/auth/reset-password/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    alert("Password successfully reset!");
  };

  return (
    <div className='login-page'>
      <div className='login-container'>
        <div className='login-box'>
          <div className='header'>
            <h2>Reset Password</h2>
          </div>

          <form className='inputs' onSubmit={handleSubmit}>
            <div className='input'>
              <input
                type='password'
                placeholder="New password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
    
            <button className='login-button' type='submit'>Reset Password</button>
        </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword