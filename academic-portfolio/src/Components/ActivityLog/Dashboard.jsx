import React, { Activity, useState, useEffect } from 'react';
import './ActivityLog.css'
import Navbar from './Navbar';
import ProfileCardDashboard from './ProfileCardDashboard';
import QuickAdd from './QuickAdd';
import ActionCard from './ActionCard';
import ActivityLog from './ActivityLog';
import { Navigate } from 'react-router-dom';
import DraftsCard from './DraftsCard';
import axios from 'axios';

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
            const res = await axios.get('http://localhost:5000/api/profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const data = res.data
            console.log('Profile response:', data)
            setUser(data.user)
            
        } catch (err) {
            console.error(err)
        }
    }

    const fetchActivities = async () => {
        try {
            const token = localStorage.getItem('token')

            const res = await axios.get('http://localhost:5000/api/activities',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            console.log('Activities:', res.data)
            setActivities(res.data.activities)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchActivities()
        fetchProfile()
    }, [])

    if (!user) return <p>Loading... (check console)</p>

    const handleSave = async (activity) => {
        const token = localStorage.getItem('token')
        await axios.put(`http://localhost:5000/api/activities/${activity._id}`,
            { ...activity, status: 'draft' },
            { headers: { Authorization: `Bearer ${token}` } }
        )
        fetchActivities()
    }

    console.log('ACTIVITIES:', activities)

    const handlePublish = async (activity) => {
        const token = localStorage.getItem('token')
        await axios.put(`http://localhost:5000/api/activities/${activity._id}`,
            { status: 'published' },
            { headers: { Authorization: `Bearer ${token}` } }
        )
        fetchActivities()
    }

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
                    <h3 className='section-title'>Activity drafts</h3>
                    <DraftsCard activities={activities} onPublish={handlePublish} onSave={handleSave} />
                </div>
            </div>

            <ActivityLog isOpen={showModal} onClose={() => setShowModal(false)} onSaved={fetchActivities} />
        </div>
    )
}

export default Dashboard