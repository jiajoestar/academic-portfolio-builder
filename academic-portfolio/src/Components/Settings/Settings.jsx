import React, { useState } from 'react';

const Settings = () => {
    const [email, setEmail] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const token = localStorage.getItem('token')

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
            <h2>Settings</h2>

            <h3>Update Email</h3>
            <input onChange={(e) => setEmail(e.target.value)} />
            <button onClick={updateEmail}>Save</button>

            <h3>Change Password</h3>
            <input type="password" placeholder="Old" onChange={(e) => setOldPassword(e.target.value)} />
            <input type="password" placeholder="New" onChange={(e) => setNewPassword(e.target.value)} />
            <button onClick={changePassword}>Save</button>
        </div>
    )
}

export default Settings