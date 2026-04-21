import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { saveActivity } from '../../Services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const CPD = ({ onSaved, existingData, hideButtons = false, mode = 'draft', externalSubmitRef }) => {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            title: '',
            courseName: '',
            organisation: '',
            audience: '',
            mode: '',
            location: '',
            duration: '',
            participantCount: '',
            date: ''
        }
    })

    const token = localStorage.getItem('token')

    const onSubmit = async (data, status = mode) => {
        const payload = {
            ...data,
            type: 'cpd',
            title: data.title,
            description: data.description,
            startDate: data.date,
            status: status,
            details: {
                courseName: data.courseName,
                organisation: data.organisation,
                audience: data.audience,
                mode: data.mode,
                location: data.location,
                duration: data.duration,
                participantCount: data.participantCount
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
                courseName: existingData.details?.courseName || '',
                organisation: existingData.details?.organisation || '',
                audience: existingData.details?.audience || '',
                location: existingData.details?.location || '',
                mode: existingData.details?.mode || '',
                duration: existingData.details?.duration || '',
                participantCount: existingData.details?.participantCount || '',
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
                <h3>CPD delivery/organisation of courses for externals</h3>
                <p>Log all things related to CPD here.</p>

                <div className='form-group'>
                    <label>Activity title</label>
                    <input placeholder='Title' {...register('title')} />
                </div>

                <div className='form-group'>
                    <label>Course name</label>
                    <input placeholder='Course name' {...register('courseName')} />
                    <label>Organisation</label>
                    <input placeholder='Organisation' {...register('organisation')} />
                    <label>Audience</label>
                    <input placeholder='Audience' {...register('audience')} />
                    <label>Location</label>
                    <input placeholder='Location' {...register('location')} />
                </div>

                <div className='form-group'>
                    <label>Mode</label>
                    <select {...register('mode')}>
                        <option>Online</option>
                        <option>In person</option>
                        <option>Hybrid</option>
                    </select>
                </div>

                <div className='form-group'>
                    <label>Duration</label>
                    <input placeholder='Duration' {...register('duration')} />
                    <label>Participant count</label>
                    <input placeholder='Participant count' {...register('participantCount')} />
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
                            className='form-button publish-button'
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

export default CPD