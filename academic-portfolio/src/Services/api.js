import axios from 'axios';

export const saveActivity = async (data, token) => {
    const res = await axios.post('http://localhost:5000/api/activities',
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
    )

    return res.data
}