import React from 'react';
import './ActivityLog.css'

const ProfileCardDashboard = ({ user }) => {
    return (
        <div className='profile-card'>
            <div className='profile-header'>
                <h3>Your profile</h3>
            </div>

            <div className='profile-main'>
                <img src={user.avatar} alt='profile' className='avatar' />
                <div>
                    <h4>{user.firstName}<br />{user.lastName}</h4>
                </div>
            </div>

            <p>{user.title}, {user.workplace}</p>
            <p className='bio'>{user.bio}</p>
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