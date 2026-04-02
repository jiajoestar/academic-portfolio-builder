import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserProfile.css'
import Navbar from '../ActivityLog/Navbar';

const UserProfile = () => {
    const [user, setUser] = useState(null)
    const [activities, setActivities] = useState([])
    const [editMode, setEditMode] = useState(false)
    const [selectedActivity, setSelectedActivity] = useState(false)

    const shareLink = user ? `${window.location.origin}/public/${user._id}` : ``

    const [form, setForm] = useState({
        name: '',
        workplace: '',
        headline: '',
        avatar: ''
    })

    const [openSections, setOpenSections] = useState({})
    const [activityForm, setActivityForm] = useState({})

    useEffect(() => {
        fetchProfile()
    }, [])

    const fetchProfile = async () => {
        const token = localStorage.getItem('token')

        const res = await axios.get('http://localhost:5000/api/profile', {
            headers: { Authorization: `Bearer ${token}` }
        })

        setUser(res.data.user)
        setActivities(res.data.activities)

        setForm({
            name: res.data.user.name || '',
            workplace: res.data.user.workplace || '',
            headline: res.data.user.headline || '',
            avatar: res.data.user.avatar || ''
        })
    }

    const saveProfile = async () => {
        const token = localStorage.getItem('token')

        const res = await axios.put(
            'http://localhost:5000/api/profile',
            form,
            { headers: { Authorization: `Bearer ${token}` } }
        )

        setUser(res.data);
        setEditMode(false);
    }

    const openEditModal = (activity) => {
        setSelectedActivity(activity)
        setActivityForm(activity)
    }

    const saveActivity = async () => {
        const token = localStorage.getItem('token')
        await axios.put(`http://localhost:5000/api/activities/${selectedActivity._id}`,
            activityForm,
            {
                headers: { Authorization: `Bearer ${token}` } 
            }
        )

        setSelectedActivity(null)
        fetchProfile()
    }

    const toggleSection = (type) => {
        setOpenSections(prev => ({
            ...prev,
            [type]: !prev[type]
        }))
    }

    // group activities by type
    const sections = {
        'Publications': [],
        'Editorial activity': [],
        'Funding': [],
        'Awards and prizes': [],
        'Memberships': [],
        'Public engagement': []
    }

    const mapType = {
        'peer-review': 'Editorial activity'
    }
    
    activities.forEach(a => {
        const typeKey = mapType[a.type] || a.type
        if (sections[typeKey]) {
            sections[typeKey].push(a)
        }
    })

    if (!user) return <p>Loading...</p>;

    return (
        <div className='profile-page'>
            <Navbar />
            <br />

            <div className='profile-header'>
                <div className='left'>
                    <img src={form.avatar ? form.avatar : 'https://via.placeholder.com/120'} />

                    {editMode ? (
                        <>
                            <input value={form.name} onChange={e => setForm({...form, name: e.target.value})}/>
                            <input value={form.headline} onChange={e => setForm({...form, headline: e.target.value})}/>
                        </>
                    ) : (
                        <>
                            <h2>{user.name}</h2>
                            <p>{user.headline}</p>
                        </>
                    )}
                    
                    <button onClick={() => setEditMode(!editMode)}>
                        {editMode ? 'Cancel' : 'Edit'}
                    </button>

                    {editMode && <button onClick={saveProfile}>Save</button>}
                </div>

                <div className='right'>
                    <h3>Pinned achievements</h3>

                    <ul>
                        {user.pinnedActivities?.map(a => (
                            <li key={a._id}>{a.title}</li>
                        ))}
                    </ul>

                    
                </div>
            </div>

            <div className='profile-body'>

                <div className='left'>
                    <h3>Workplace</h3>

                    {editMode ? (
                        <input value={form.workplace} onChange={e => setForm({...form, workplace: e.target.value})}/>
                    ) : (
                        <p>{user.workplace || 'Not set'}</p>
                    )}

                    <button onClick={() => navigator.clipboard.writeText(shareLink)}>Share your profile</button>
                </div>

                <div className='right'>
                    {Object.entries(sections).map(([type, items]) => (
                        <div key={type} className='section'>

                            <div className='section-header' onClick={() => toggleSection(type)}>
                                <h3>{type}</h3>
                                <span>{openSections[type] ? '▼' : '▶'}</span>
                            </div>

                            {openSections[type] && (
                                <div className='section-content'>
                                    {items.length === 0 ? (
                                        <p>Nothing to see here yet.</p>
                                    ) : (
                                        items.map(a => (
                                            <div key={a._id} className='activity-item'>
                                                <strong>{a.title}</strong>
                                                <p>{a.description}</p>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default UserProfile