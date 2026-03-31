import React from 'react';
import './Forms.css'
import { useForm } from 'react-hook-form';
import { saveActivity } from '../../Services/api';

const ParticipationActivity = () => {
    const { register, handleSubmit } = useForm()
    const token = localStorage.getItem('token')

    const onSubmit = async (data, status) => {
        await saveActivity({ ...data, type: 'participation', status }, token)
        alert(`Saved as ${status}`)
    }

    return (
        <form className='form-container'>
            <h3>Participation or Organisation for events</h3>

            <div className='form-group'>
                <label>Participated <input type='checkbox' {...register('participated')} /></label>
                <label>Organised <input type='checkbox' {...register('organised')} /></label>
            </div>

            <div className='form-group'>
                <label>Invited?</label>
                <label><input type='radio' value='yes' {...register('invited')} />Yes</label>
                <label><input type='radio' value='no' {...register('invited')} />No</label>
            </div>

            <div className='form-group'>
                <label>Event type</label>
                <select {...register('eventType')}>
                    <option>Conference</option>
                </select>
            </div>

            <div className='form-group'>
                <label>Location</label>
                <input {...register('location')} />
            </div>

            <div className='form-group'>
                <label>Description</label>
                <textarea {...register('description')} />
            </div>

            <div className='form-group'>
                <label>Event date</label>
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

export default ParticipationActivity