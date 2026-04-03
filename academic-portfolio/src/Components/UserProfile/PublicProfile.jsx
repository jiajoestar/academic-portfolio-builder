import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PublicProfile = () => {
    const { id } = useParams()
    const [user, setUser] = useState(null)
    const [activities, setActivities] = useState([])

    useEffect(() => {
        const fetchPublic = async () => {
            const res = await axios.get(`http://localhost:5000/api/public/${id}`)
            setUser(res.data.user)
            setActivities(res.data.activities)
        }
        fetchPublic()
    }, [id])

    if (!user) return <p>Loading...</p>

    return (
        <div>
            <h1>{user.name}</h1>

            {activities.map(a => (
                <div key={a._id}>
                    <strong>{a.type}</strong>
                    <p>{a.description}</p>
                </div>
            ))}
        </div>
    )
}

export default PublicProfile