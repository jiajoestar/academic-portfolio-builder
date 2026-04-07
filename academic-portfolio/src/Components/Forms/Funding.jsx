import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { saveActivity } from '../../Services/api';

const Funding = ({ onSaved, existingData }) => {
    const { register, handleSubmit } = useForm()

    const token = localStorage.getItem('token')

    const onSubmit = async (data, status) => {
        const payload = {
            type: 'funding',
            title: data.title,
            description: data.description,
            startDate: data.startDate,
            endDate: data.endDate,
            status,
            details: {
                funder: data.funder,
                amount: Number(data.amount),
                role: data.role
            }
        }

        await saveActivity(payload, token)
        onsaved && onSaved()
    }

    return (
        <form className='form-container'>
            <h3>Funding</h3>
            <p>Log all things related to funding here.</p>

            <div className='form-group'>
                <label>Title</label>
                <input placeholder='Title' {...register('title')} />
            </div>

            <div className='form-group'>
                <label>Funder</label>
                <input placeholder='Funder' {...register('funder')} />
                <label>Amount</label>
                <input placeholder='Amount' type='number' {...register('amount')} />
                <label>Role</label>
                <input placeholder='Role (PI, Co-I)' {...register('role')} />
            </div>

            <div className='form-group'>
                <label>Description</label>
                <textarea placeholder='Description' {...register('description')} />
            </div>

            <div className='form-group'>
                <label>Start date</label>
                <input type='date' {...register('startDate')} />
                <label>End date</label>
                <input type='date' {...register('endDate')} />
            </div>
            
            <div className='form-actions'>
                <button type='button' onClick={handleSubmit(d => onSubmit(d, 'draft'))}>Save</button>
                <button type='button' onClick={handleSubmit(d => onSubmit(d, 'published'))}>Publish</button>
            </div>
        </form>
    )
}

export default Funding