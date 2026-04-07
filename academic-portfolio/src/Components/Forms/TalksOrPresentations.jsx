import React from 'react';
import './Forms.css'
import { useForm } from 'react-hook-form';
import { saveActivity } from '../../Services/api';

const TalksOrPresentations = ({ onSaved }) => {
    const { register, handleSubmit } = useForm()
    const token = localStorage.getItem('token')

    const onSubmit = async (data, status) => {
        const payload = {
            type: 'talk',
            title: data.title,
            description: data.description,
            startDate: data.date,
            status,
            details: {
                event: data.event,
                audienceSize: Number(data.audienceSize),
                talkType: data.talkType
            }
        }

        await saveActivity(payload, token)
        onSaved && onSaved()
    }

    return (
        <form className='form-container'>
            <h3>Talks/Presentations</h3>
            <p>Log all things related to talks and presentations here.</p>

            <div className='form-group'>
                <label>Title</label>
                <input placeholder='Title' {...register('title')} />
            </div>

            <div className='form-group'>
                <label>Event</label>
                <input placeholder='Event' {...register('event')} />
            </div>

            <div className='form-group'>
                <label>Audience size</label>
                <input placeholder='Audience size' type='number' {...register('audienceSize')} />
            </div>

            <div className='form-group'>
                <label>Type</label>
                <select {...register('talkType')}>
                    <option value='invited'>Invited</option>
                    <option value='keynote'>Keynote</option>
                </select>
            </div>

            <div className='form-group'>
                <label>Description</label>
                <textarea placeholder='Description' {...register('description')} />
            </div>

            <div className='form-group'>
                <label>Date</label>
                <input type='date' {...register('date')} />
            </div>

            <div className='form-actions'>
                <button type='button' onClick={handleSubmit(d => onSubmit(d, 'draft'))}>Save</button>
                <button type='button' onClick={handleSubmit(d => onSubmit(d, 'published'))}>Publish</button>
            </div>
        </form>
    )
}
export default TalksOrPresentations