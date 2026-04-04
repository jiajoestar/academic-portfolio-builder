import axios from 'axios';

export const saveActivity = (data, token) => {
    return axios.post('http://localhost:5000/api/activities',
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
}