import React, { use } from 'react';
import './Forms.css'
import { useForm } from 'react-hook-form';
import { saveActivity } from '../../Services/api';

const Examination = () => {
    const { register, handleSubmit, reset } = useForm()

    const token = localStorage.getItem('token')

    const onSubmit = async (data, status) => {
        const payload = {
            ...data,
            type: 'peer-review',
            status // draft or published
        }

        try {
            const res = await saveActivity(payload, token)
            onSaved()
            console.log(res)
            alert(`Saved as ${status}`)
            reset()
        } catch (err) {
            console.error(err)
            alert(`Error saving`)
        }
    }

    return (
        <form className='form-container'>
            <h3>Examination</h3>
            <p>Log all things related to examinations here.</p>

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
                <button type='button' onClick={handleSubmit(data => onSubmit(data, 'draft'))}>Save</button>
                <button type='button' onClick={handleSubmit(data => onSubmit(data, 'published'))}>Publish</button>
            </div>
        </form>
    )
}

export default Examination