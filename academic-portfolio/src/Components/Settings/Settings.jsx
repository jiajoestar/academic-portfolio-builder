import React, { useState } from 'react';
import './Settings.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Settings = () => {
    const user = JSON.parse(localStorage.getItem("user"))

    const [email, setEmail] = useState(user.email)
    const [password, setPassword] = useState("")

    const updateEmail = async () => {
        await axios.put("http://localhost:5000/api/auth/update-email", {
            userId: user.id,
            email
        })
        alert("Email updated")
    }

    const changePassword = async () => {
        await axios.put("http://localhost:5000/api/auth/change-password", {
            userId: user.id,
            password
        })
        alert("Password changed")
    }

    return (
        <div>
            <h2>Settings</h2>

            <input value={email} onChange={e => setEmail(e.target.value)} />
            <button onClick={updateEmail}>Save Email</button>

            <input
                type="password"
                placeholder="New password"
                onChange={e => setPassword(e.target.value)}
            />
            <button onClick={changePassword}>Change Password</button>
        </div>
    )
}

export default Settings
