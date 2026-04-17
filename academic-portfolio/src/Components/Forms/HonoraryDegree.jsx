import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { saveActivity } from '../../Services/api';

const HonoraryDegree = ({ onSaved, existingData, hideButtons = false, mode = 'draft', externalSubmitRef }) => {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            title: '',
            degreeTitle: '',
            institution: '',
            country: '',
            description: '',
            startDate: '',
            endDate: ''
        }
    })

    const token = localStorage.getItem('token')

    const onSubmit = async (data, status = mode) => {
        const payload = {
            ...data,
            type: 'honoraryDegree',
            title: data.title,
            description: data.description,
            startDate: data.startDate,
            endDate: data.endDate,
            status: status,
            details: {
                degreeTitle: data.degreeTitle,
                institution: data.institution,
                country: data.country
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
                degreeTitle: existingData.details?.degreeTitle || '',
                institution: existingData.details?.institution || '',
                country: existingData.details?.country || '',
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
            <h3>Honorary degree</h3>
            <p>Log all things related to honorary degrees here.</p>

            <div className='form-group'>
                <label>Title</label>
                <input placeholder='Title' {...register('title')} />
            </div>

            <div className='form-group'>
                <label>Degree title</label>
                <input placeholder='Degree title' {...register('degreeTitle')} />
                <label>Institution</label>
                <input placeholder='Institution' {...register('institution')} />
                <label>Country</label>
                <input placeholder='Country' {...register('country')} />
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

export default HonoraryDegree