import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { saveActivity } from '../../Services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Festival = ({ onSaved, existingData, hideButtons = false, mode = 'draft', externalSubmitRef }) => {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            title: '',
            festivalName: '',
            hostOrganisation: '',
            role: '',
            location: '',
            description: '',
            date: ''
        }
    })

    const token = localStorage.getItem('token')

    const onSubmit = async (data, status = mode) => {
        const payload = {
            ...data,
            type: 'festival',
            title: data.title,
            description: data.description,
            startDate: data.date,
            status: status,
            details: {
                festivalName: data.festivalName,
                hostOrganisation: data.hostOrganisation,
                role: data.role,
                location: data.location
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
            toast.success(`Saved as ${status}`)
            if (!existingData) reset()
        } catch (err) {
            console.error(err)
            toast.error(`Error saving`)
        }
    }

    useEffect(() => {
        if (existingData) {
            reset({
                title: existingData.title || '',
                festivalName: existingData.details?.festivalName || '',
                hostOrganisation: existingData.details?.hostOrganisation || '',
                role: existingData.details?.role || '',
                location: existingData.details?.location || '',
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
        <>
            <ToastContainer />
            <form className='form-container' onSubmit={handleSubmit((data) => onSubmit(data, 'draft'))}>
                <h3>Festival/exhibition</h3>
                <p>Log all things related to funding here.</p>

                <div className='form-group'>
                    <label>Activity title</label>
                    <input placeholder='Title' {...register('title')} />
                </div>

                <div className='form-group'>
                    <label>Festival/exhibition name</label>
                    <input placeholder='Festival/exhibition name' {...register('festivalName')} />
                    <label>Host organisation</label>
                    <input placeholder='Host organisation' {...register('hostOrganisation')} />
                    <label>Role</label>
                    <input placeholder='Role (PI, Co-I)' {...register('role')} />
                    <label>Location</label>
                    <input placeholder='Location' {...register('location')} />
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
        </>
    )
}

export default Festival