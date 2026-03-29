import React from 'react';
import './ActivityLog.css'

const ProfileCardDashboard = () => {
    return (
        <div className='profile-card'>
            <div className='profile-header'>
                <h3>Your profile</h3>
            </div>

            <div className='profile-main'>
                <div className='avatar'></div>
                <div>
                    <h4>First name<br />Surname</h4>
                </div>
            </div>

            <p>Title, workplace</p>
            <p className='bio'>profile biography</p>
            <br />

            <h4>Actions</h4>
            <ul className='miniprofile-actions-list'>
                <li>view publications</li>
                <li>view memberships</li>
                <li>view funding</li>
            </ul>
            <p className='settings'>settings</p>
        </div>
    )
}

export default ProfileCardDashboard