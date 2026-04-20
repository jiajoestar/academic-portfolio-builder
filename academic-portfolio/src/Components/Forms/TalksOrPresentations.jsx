import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { saveActivity } from '../../Services/api';

const TalksOrPresentations = ({ onSaved, existingData, hideButtons = false, mode = 'draft', externalSubmitRef }) => {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            title: '',
            eventName: '',
            hostOrganisation: '',
            talkType: '',
            location: '',
            audienceType: '',
            description: '',
            date: '',
            invited: ''
        }
    })

    const token = localStorage.getItem('token')

    const onSubmit = async (data, status = mode) => {
        const payload = {
            ...data,
            type: 'talksOrPresentations',
            title: data.title,
            description: data.description,
            startDate: data.date,
            status: status,
            details: {
                eventName: data.eventName,
                hostOrganisation: data.hostOrganisation,
                talkType: data.talkType,
                location: data.location,
                audienceType: data.audienceType,
                invited: data.invited
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
                hostOrganisation: existingData.details?.hostOrganisation || '',
                talkType: existingData.details?.talkType || '',
                location: existingData.details?.location || '',
                audienceType: existingData.details?.audienceType || '',
                description: existingData.description || '',
                invited: existingData.details?.invited || '',
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
            <h3>Talks or presentations</h3>
            <p>Log all things related to talks or presentations here.</p>

            <div className='form-group'>
                <label>Activity title</label>
                <input placeholder='Title' {...register('title')} />
            </div>

            <div className='form-group'>
                <label>Event name</label>
                <input placeholder='Event name' {...register('funder')} />
                <label>Host organisation</label>
                <input placeholder='Host organisation' {...register('hostOrganisation')} />
                <label>Invited?</label>
                <input type='radio' name='Yes' {...register('invited')} />
                <input type='radio' name='No' {...register('invited')} />
            </div>

            <div className='form-group'>
                <label>Talk type</label>
                <select {...register('talkType')}>
                    <option>Keynote</option>
                    <option>Conference</option>
                    <option>Seminar</option>
                </select>
            </div>

            <div className='form-group'>
                <label>Location</label>
                <input placeholder='Location' {...register('location')} />
                <label>Audience type</label>
                <input placeholder='Audience type' {...register('audienceType')} />
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
    )
}

export default TalksOrPresentations