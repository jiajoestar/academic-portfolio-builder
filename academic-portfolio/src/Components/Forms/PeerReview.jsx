import React, { useEffect } from 'react';
import './Forms.css'
import { useForm } from 'react-hook-form';
import { saveActivity } from '../../Services/api';
import axios from 'axios';

const PeerReview = ({ onSaved, existingData, hideButtons = false, mode = 'draft' }) => {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            reviewType: '',
            description:'',
            day: '',
            month: '',
            year: ''
        }
    })

    const token = localStorage.getItem('token')

    const onSubmit = async (data, status = mode) => {
        const payload = {
            ...data,
            day: data.day || '',
            month: data.month || '',
            year: data.year || '',
            type: 'peer-review',
            status: status
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
            reset()
        } catch (err) {
            console.error(err)
            alert(`Error saving`)
        }
    }

    useEffect(() => {
        if (existingData) {
            reset({
                reviewType: existingData.reviewType || '',
                description: existingData.description || '',
                day: existingData.day || '',
                month: existingData.month || '',
                year: existingData.year || ''
            })
        }
    }, [existingData, reset])

    return (
        <form className='form-container' onSubmit={handleSubmit((data) => onSubmit(data, 'draft'))}>
            <h3>Peer-review and editorial activity</h3>
            <p>Log all things related to peer-reviews and editorial actvity here.</p>

            <div className='form-group'>
                <label>Type</label>
                <select {...register('reviewType')}>
                    <option>Funding body peer-review</option>
                </select>
            </div>

            <div className='form-group'>
                <label>Description</label>
                <textarea {...register('description', { required: true })} />
            </div>

            <div className='form-group'>
                <label>Date received</label>
                <div className='date-group'>
                    <input placeholder='DD' {...register('day')} />
                    <input placeholder='MM' {...register('month')} />
                    <input placeholder='YYYY' {...register('year')} />
                </div>
            </div>

            
                <div className='form-actions'>
                <button type='submit' onClick={handleSubmit((data) => onSubmit(data, 'draft'))}>Save</button>
                <button type='submit' onClick={handleSubmit((data) => onSubmit(data, 'published'))}>Publish</button>
            </div>
            
        </form>
    )
}

export default PeerReview