import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { saveActivity } from '../../Services/api';

const ParticipationActivity = ({ onSaved, existingData, hideButtons = false, mode = 'draft', externalSubmitRef }) => {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            title: '',
            eventName: '',
            role: '',
            organisation: '',
            location: '',
            description: '',
            date: ''
        }
    })

    const token = localStorage.getItem('token')

    const onSubmit = async (data, status = mode) => {
        const payload = {
            ...data,
            type: 'participation',
            title: data.title,
            description: data.description,
            startDate: data.date,
            status: status,
            details: {
                eventName: data.eventName,
                organisation: data.organisation,
                role: data.role,
                location: data.location
            },
            pinned: existingData?.pinned || false
        }

        try {
            let res

            if (existingData?._id) {
            // UPDATE
            res = await axios.put(
                `http://localhost:5000/api/activities/${existingData._id}`,
                payload,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            } else {
            // CREATE
            res = await saveActivity(payload, token)
            }
            
            if (onSaved) await onSaved()
            console.log(res)
            console.log('PAYLOAD:', payload)
            console.log('FORM DATA:', data)
            alert(`Saved as ${status}`)
            if (!existingData) reset()
        } catch (err) {
            console.error(err)
            alert(`Error saving`)
        }
    }

    useEffect(() => {
        if (existingData) {
            reset({
                title: existingData.title || '',
                eventName: existingData.details?.eventName || '',
                location: existingData.details?.location || '',
                organisation: existingData.details?.organisation || '',
                role: existingData.details?.role || '',
                description: existingData.description || '',
                date: existingData.startDate
                    ? new Date(existingData.startDate).toISOString().split('T')[0]
                    : ''
            })
        }
    }, [existingData, reset])

    useEffect(() => {
        if (externalSubmitRef) {
            externalSubmitRef.current = {
                save: handleSubmit((data) => onSubmit(data, mode)),
                publish: handleSubmit((data) => onSubmit(data, 'published'))
            }
        }
    }, [externalSubmitRef, handleSubmit, existingData, mode])

    return (
        <form className='form-container' onSubmit={handleSubmit((data) => onSubmit(data, 'draft'))}>
            <h3>Participation or organisation for events</h3>
            <p>Log all things related to participation or organisation for events here.</p>

            <div className='form-group'>
                <label>Title</label>
                <input placeholder='Title' {...register('title')} />
            </div>

            <div className='form-group'>
                <label>Event name</label>
                <input placeholder='Event name' {...register('eventName')} />
                <label>Organisation</label>
                <input placeholder='Organisation' {...register('organisation')} />
                <label>Role</label>
                <select {...register('role')}>
                    <option>Organiser</option>
                    <option>Participant</option>
                    <option>Chair</option>
                    <option>Moderator</option>
                </select>
                <label>Location</label>
                <input placeholder='Location' {...register('location')} />
            </div>

            <div className='form-group'>
                <label>Description</label>
                <textarea placeholder='Description' {...register('description')} />
            </div>

            <div className='form-group'>
                <label>Date</label>
                <input type='date' {...register('date')} />
            </div>
            
            {!hideButtons && (
                <div className='form-actions'>
                    <button type='submit'>Save</button>
                    <button
                        type='button'
                        onClick={handleSubmit((data) => onSubmit(data, 'published'))}
                    >
                        Publish
                    </button>
                </div>
            )}
        </form>
    )
}

export default ParticipationActivity