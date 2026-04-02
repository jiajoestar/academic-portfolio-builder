import React, { Activity, useState, useEffect } from 'react';
import './ActivityLog.css'
import Navbar from './Navbar';
import ProfileCardDashboard from './ProfileCardDashboard';
import QuickAdd from './QuickAdd';
import ActionCard from './ActionCard';
import ActivityLog from './ActivityLog';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
    const [showModal, setShowModal] = useState(false)
    const [user, setUser] = useState(null)
    const [activities, setActivities] = useState([])

    if (!localStorage.getItem('token')) {
        return <Navigate to="/login" />
    }

    const fetchProfile = async () => {
        const token = localStorage.getItem('token')
        console.log('sending token:', token)

        try {
            const res = await fetch('http://localhost:5000/api/profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const data = await res.json()
            console.log('Profile response:', data)
            setUser(data.user)
            setActivities(data.activities)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchProfile()
    }, [])

    if (!user) return <p>Loading... (check console)</p>

    return (
        <div>
            <Navbar />

            <div className='dashboard-page'>
                <div className='sidebar'>
                    <ProfileCardDashboard user={user} />
                </div>
                <div className='main'>
                    <QuickAdd onOpen={() => setShowModal(true)} />
                    <h3 className='section-title'>Your recent activity</h3>
                    <ActionCard activities={activities}/>
                </div>
            </div>

            <ActivityLog isOpen={showModal} onClose={() => setShowModal(false)} onSaved={fetchProfile} />
        </div>
    )
}

export default Dashboard