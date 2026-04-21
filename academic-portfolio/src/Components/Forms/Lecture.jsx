import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { saveActivity } from '../../Services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Lecture = ({ onSaved, existingData, hideButtons = false, mode = 'draft', externalSubmitRef }) => {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            title: '',
            eventName: '',
            hostOrganisation: '',
            eventType: '',
            location: '',
            description: '',
            date: ''
        }
    })

    const token = localStorage.getItem('token')

    const onSubmit = async (data, status = mode) => {
        const payload = {
            ...data,
            type: 'lecture',
            title: data.title,
            description: data.description,
            startDate: data.date,
            status: status,
            details: {
                eventName: data.eventName,
                hostOrganisation: data.hostOrganisation,
                location: data.location,
                eventType: data.eventType
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
            toast.success(`Saved as ${status}`)
            if (!existingData) reset()
        } catch (err) {
            console.error(err)
            toast.error(`Error saving`)
        }
    }

    useEffect(() => {
        if (existingData) {
            reset({
                title: existingData.title || '',
                eventName: existingData.details?.eventName || '',
                eventType: existingData.details?.eventType || '',
                hostOrganisation: existingData.details?.hostOrganisation || '',
                location: existingData.details?.location || '',
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
        <>
            <ToastContainer />
            <form className='form-container' onSubmit={handleSubmit((data) => onSubmit(data, 'draft'))}>
                <h3>Public lecture/debate/seminar</h3>
                <p>Log all things related to public lectures, debates, and seminars here.</p>

                <div className='form-group'>
                    <label>Activity title</label>
                    <input placeholder='Title' {...register('title')} />
                </div>

                <div className='form-group'>
                    <label>Event name</label>
                    <input placeholder='Event name' {...register('eventName')} />
                    <label>Host organisation</label>
                    <input placeholder='Host organisation' {...register('hostOrganisation')} />
                    <label>Event type</label>
                    <select {...register('eventType')}>
                        <option>Lecture</option>
                        <option>Debate</option>
                        <option>Seminar</option>
                    </select>
                    <label>Location</label>
                    <input placeholder='Location' {...register('location')} />
                </div>

                <div className='form-group'>
                    <label>Description</label>
                    <textarea placeholder='Description' {...register('description')} />
                </div>

                <div className='form-group form-group-dates'>
                    <label>Date</label>
                    <input type='date' {...register('date')} />
                </div>
                
                {!hideButtons && (
                    <div className='form-actions'>
                        <button type='submit' className='form-button save-button'>Save as draft</button>
                        <button
                            type='button'
                            className='fomr-button publish-button'
                            onClick={handleSubmit((data) => onSubmit(data, 'published'))}
                        >
                            Publish to profile
                        </button>
                    </div>
                )}
            </form>
        </>
    )
}

export default Lecture