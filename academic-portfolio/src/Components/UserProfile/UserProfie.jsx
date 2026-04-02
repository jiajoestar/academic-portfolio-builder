import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserProfile.css'

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [activities, setActivities] = useState([]);
    const [editMode, setEditMode] = useState(false);

    const [form, setForm] = useState({
        name: '',
        workplace: '',
        headline: '',
        avatar: ''
    });

    const [openSections, setOpenSections] = useState({});

    useEffect(() => {
        fetchProfile();
    }, []);

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

    const toggleSection = (type) => {
        setOpenSections(prev => ({
            ...prev,
            [type]: !prev[type]
        }))
    }

    // group activities by type
    const grouped = activities.reduce((acc, a) => {
        if (!acc[a.type]) acc[a.type] = []
        acc[a.type].push(a)
        return acc
    }, {})

    if (!user) return <p>Loading...</p>;

    return (
        <div className='profile-page'>

            <div className='profile-header'>
                <div className='left'>
                    <img src={form.avatar || 'https://via.placeholder.com/120'} alt='' />

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
                </div>

                <div className='right'>
                    <h3>Pinned achievements</h3>

                    <ul>
                        {user.pinnedActivities?.map(a => (
                            <li key={a._id}>{a.title}</li>
                        ))}
                    </ul>

                    <button onClick={() => setEditMode(!editMode)}>
                        {editMode ? 'Cancel' : 'Edit'}
                    </button>

                    {editMode && <button onClick={saveProfile}>Save</button>}
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
                </div>

                <div className='right'>
                    {Object.keys(grouped).map(type => (
                        <div key={type} className='section'>

                            <div className='section-header' onClick={() => toggleSection(type)}>
                                <h3>{type}</h3>
                                <span>{openSections[type] ? '▼' : '▶'}</span>
                            </div>

                            {openSections[type] && (
                                <div className='section-content'>
                                    {grouped[type].map(a => (
                                        <div key={a._id} className='activity-item'>
                                            <strong>{a.title}</strong>
                                            <p>{a.description}</p>
                                        </div>
                                    ))}
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