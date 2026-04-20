import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { saveActivity } from '../../Services/api';

const Fellowship = ({ onSaved, existingData, hideButtons = false, mode = 'draft', externalSubmitRef }) => {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            title: '',
            fellowshipName: '',
            awardingBody: '',
            competitive: '',
            value: '',
            duration: '',
            description: '',
            startDate: '',
            endDate: ''
        }
    })

    const token = localStorage.getItem('token')

    const onSubmit = async (data, status = mode) => {
        const payload = {
            ...data,
            type: 'fellowship',
            title: data.title,
            description: data.description,
            startDate: data.startDate,
            endDate: data.endDate,
            status: status,
            details: {
                fellowshipName: data.fellowshipName,
                awardingBody: data.awardingBody,
                competitive: data.competitive,
                value: data.value,
                duration: data.duration
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
                fellowshipName: existingData.details?.fellowshipName || '',
                competitive: existingData.details?.competitive || '',
                awardingBody: existingData.details?.awardingBody || '',
                value: existingData.details?.value || '',
                duration: existingData.details?.duration || '',
                description: existingData.description || '',
                startDate: existingData.startDate
                    ? new Date(existingData.startDate).toISOString().split('T')[0]
                    : '',
                endDate: existingData.endDate
                    ? new Date(existingData.endDate).toISOString().split('T')[0]
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
            <h3>Fellowship awarded competitively</h3>
            <p>Log all things related to fellowships here.</p>

            <div className='form-group'>
                <label>Activity title</label>
                <input placeholder='Title' {...register('title')} />
            </div>

            <div className='form-group'>
                <label>Fellowship name</label>
                <input placeholder='Fellowship name' {...register('fellowshipName')} />
                <label>Awarding body</label>
                <input placeholder='Awarding body' {...register('awardingBody')} />
                <label>Competitive?</label>
                <label><input type='radio' {...register('competitive')} />Yes</label>
                <label><input type='radio' {...register('competitive')} />No</label>
                <label>Value</label>
                <input type='number' placeholder='Value' {...register('value')} />
                <label>Duration</label>
                <input placeholder='Duration' {...register('duration')} />
            </div>

            <div className='form-group'>
                <label>Description</label>
                <textarea placeholder='Description' {...register('description')} />
            </div>

            <div className='form-group form-group-dates'>
                <label>Start date</label>
                <input type='date' {...register('startDate')} />
                <label>End date</label>
                <input type='date' {...register('endDate')} />
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

export default Fellowship