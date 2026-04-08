import React, { useState } from 'react';
import Navbar from '../ActivityLog/Navbar';
import { useNavigate } from 'react-router-dom';
import './Settings.css'

const Settings = () => {
    const [email, setEmail] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    const updateEmail = async () => {
        await fetch('http://localhost:5000/api/auth/update-email', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ email })
        })

        alert('Email updated')
    }

    const changePassword = async () => {
        await fetch('http://localhost:5000/api/auth/change-password', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ oldPassword, newPassword })
        })

        alert('Password updated')
    }

    return (
        <div>
            <Navbar />

            <div className='settings-container'>
                <button className='back-button' onClick={() => navigate(-1)}>← Back</button>
                <h2 className='settings-header'>Settings</h2>

                <div className='settings-card'>
                    <h3>Update email</h3>
                    <div className='settings-row'>
                        <input placeholder='New email' onChange={(e) => setEmail(e.target.value)} />
                        <button onClick={updateEmail}>Save</button>
                    </div>
                </div>

                <div className='settings-card'>
                    <h3>Change password</h3>
                    <div className='settings-row'>
                        <input type='password' placeholder='Old password' onChange={(e) => setOldPassword(e.target.value)} />
                        <input type='password' placeholder='New password' onChange={(e) => setNewPassword(e.target.value)} />
                        <button onClick={changePassword}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings