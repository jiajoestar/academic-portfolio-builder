import React from 'react';
import './Forms.css'
import { useForm } from 'react-hook-form';
import { saveActivity } from '../../Services/api';

const Fellowship = ({ onSaved }) => {
    const { register, handleSubmit } = useForm()
    const token = localStorage.getItem('token')

    const onSubmit = async (data, status) => {
        await saveActivity({ ...data, type: 'award', status }, token)
        if (onSaved) onSaved()
        alert(`Saved as ${status}`)
    }

    return (
        <form className='form-container'>
            <h3>Fellowship awarded competitively</h3>

            <div className='form-group'>
                <label>Prize title</label>
                <input {...register('title', { required: true })} />
            </div>

            <div className='form-group'>
                <label>Location</label>
                <input {...register('location')} />
            </div>

            <div className='form-group'>
                <label>Field</label>
                <select {...register('field')}>
                    <option>Computer science</option>
                </select>
            </div>

            <div className='form-group'>
                <label>Description</label>
                <textarea {...register('description')} />
            </div>

            <div className='form-group'>
                <label>Date achieved</label>
                <div className='date-group'>
                    <input placeholder='DD' {...register('day')} />
                    <input placeholder='MM' {...register('month')} />
                    <input placeholder='YYYY' {...register('year')} />
                </div>
            </div>

            <div className='form-actions'>
                <button type='button' onClick={handleSubmit(data => onSubmit(data, 'draft'))}>Save</button>
                <button type='button' onClick={handleSubmit(data => onSubmit(data, 'publish'))}>Publish</button>
            </div>
        </form>
    )
}

export default Fellowship