import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL

export const saveActivity = (data, token) => {
    return axios.post(`${API_URL}/api/activities`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
}