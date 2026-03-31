import React, { Activity, useState, useEffect } from 'react';
import './ActivityLog.css'
import Navbar from './Navbar';
import ProfileCardDashboard from './ProfileCardDashboard';
import QuickAdd from './QuickAdd';
import ActionCard from './ActionCard';
import ActivityLog from './ActivityLog';

const Dashboard = () => {
    const [showModal, setShowModal] = useState(false)
    const [user,setUser] = useState(null)

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        console.log('storedUser:', storedUser)
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    if (!user) return <p>Loading...</p>

    return (
        <div>
            <Navbar />

            <div className='dashboard-page'>
                <div className='sidebar'>
                    <ProfileCardDashboard user={user} />
                </div>
                <div className='main'>
                    <QuickAdd onOpen={() => setShowModal(true)} />
                    <h3 className='section-title'>Actions</h3>
                    <ActionCard />
                </div>
            </div>

            <ActivityLog isOpen={showModal} onClose={() => setShowModal(false)} />
        </div>
    )
}

export default Dashboard