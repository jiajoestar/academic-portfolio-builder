import React, { Activity, useState } from 'react';
import './ActivityLog.css'
import Navbar from './Navbar';
import ProfileCardDashboard from './ProfileCardDashboard';
import QuickAdd from './QuickAdd';
import ActionCard from './ActionCard';
import ActivityLog from './ActivityLog';

const Dashboard = () => {
    const [showModal, setShowModal] = useState(false)

    return (
        <div>
            <Navbar />

            <div className='dashboard-page'>
                <div className='sidebar'>
                    <ProfileCardDashboard />
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