export const saveActivity = async (data, token) => {
    const res = await fetch('http://localhost:5000/api/activity/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })

    return res.json()
}