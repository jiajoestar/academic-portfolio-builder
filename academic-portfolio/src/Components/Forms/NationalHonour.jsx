import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { saveActivity } from '../../Services/api';

const NationalHonour = ({ onSaved, existingData, hideButtons = false, mode = 'draft', externalSubmitRef }) => {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            title: '',
            honourName: '',
            awardingBody: '',
            country: '',
            level: '',
            description: '',
            date: ''
        }
    })

    const token = localStorage.getItem('token')

    const onSubmit = async (data, status = mode) => {
        const payload = {
            ...data,
            type: 'national_honour',
            title: data.title,
            description: data.description,
            startDate: data.date,
            status: status,
            details: {
                honourName: data.honourName,
                awardingBody: data.awardingBody,
                country: data.country,
                level: data.level
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
                honourName: existingData.details?.honourName || '',
                awardingBody: existingData.details?.awardingBody || '',
                country: existingData.details?.country || '',
                level: existingData.details?.level || '',
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
            <h3>National/international honour</h3>
            <p>Log all things related to national/international honour here.</p>

            <div className='form-group'>
                <label>Title</label>
                <input placeholder='Title' {...register('title')} />
            </div>

            <div className='form-group'>
                <label>Honour name</label>
                <input placeholder='Honour name' {...register('honourName')} />
                <label>Awarding body</label>
                <input placeholder='Awarding body' {...register('awardingBody')} />
                <label>Country</label>
                <input placeholder='Country' {...register('country')} />
                <label>Level</label>
                <input placeholder='Level' {...register('level')} />
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
                    <button type='submit' className='form-button save-button'>Save</button>
                    <button
                        type='button'
                        className='form-button publish-button'
                        onClick={handleSubmit((data) => onSubmit(data, 'published'))}
                    >
                        Publish
                    </button>
                </div>
            )}
        </form>
    )
}

export default NationalHonour