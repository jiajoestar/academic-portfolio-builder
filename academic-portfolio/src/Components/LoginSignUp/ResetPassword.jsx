import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './LoginSignUp.css'

const ResetPassword = () => {
  const { token } = useParams()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || "Failed to reset password");
      }

      alert('Password successfully reset!')
      navigate('/login')
    } catch (err) {
      console.error('Reset password error:', err)
      alert(err.message)
    }
  }

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
                placeholder='New password'
                value={password}
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