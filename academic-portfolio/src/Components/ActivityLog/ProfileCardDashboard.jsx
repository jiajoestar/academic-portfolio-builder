import React from 'react';
import './ActivityLog.css'
import { Link } from 'react-router-dom';
import MonthlyContributionGrid from './MonthlyContributionGrid';

const ProfileCardDashboard = ({ user, activities = [] }) => {
    
    const displayName = user?.name || [user?.firstName, user?.lastName].filter(Boolean).join(' ') || 'Your name'

    const workplace = user?.workplace || 'No workplace set yet'

    const avatarSrc = user?.avatar || 'https://via/placeholder.com/100'

    return (
        <div className='profile-card'>
            <h3>Your profile</h3>

            <div className='profile-main'>
                <img src={avatarSrc} alt='profile' className='avatar' />
                <div className='profile-identity'>
                    <h4 className='profile-name'>{displayName}</h4>
                    <p className='profile-workplace'>{workplace}</p>
                </div>
            </div>

            <MonthlyContributionGrid activities={activities} />

            <br></br>

            <div className='profile-card-actions'>
                <Link to='/profile' className='profile-link-button'>View profile</Link>
                <br></br>
                <Link to='/settings' className='settings'>Settings</Link>
            </div>
        </div>
    )
}

export default ProfileCardDashboard