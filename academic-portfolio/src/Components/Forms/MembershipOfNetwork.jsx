import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { saveActivity } from '../../Services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const MembershipOfNetwork = ({ onSaved, existingData, hideButtons = false, mode = 'draft', externalSubmitRef }) => {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            title: '',
            networkName: '',
            role: '',
            scope: '',
            description: '',
            startDate: '',
            endDate: ''
        }
    })

    const token = localStorage.getItem('token')

    const onSubmit = async (data, status = mode) => {
        const payload = {
            ...data,
            type: 'membershipOfNetwork',
            title: data.title,
            description: data.description,
            startDate: data.startDate,
            endDate: data.endDate,
            status: status,
            details: {
                networkName: data.networkName,
                scope: data.scope,
                role: data.role
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
            console.error('Save error:', err)
            console.error('Response data:', err.response?.data)
            console.error('Status:', err.response?.status)
            console.error('Payload:', payload)
            toast.error(err.response?.data?.message || 'Error saving')
        }
    }

    useEffect(() => {
        if (existingData) {
            reset({
                title: existingData.title || '',
                networkName: existingData.details?.networkName || '',
                scope: existingData.details?.scope || '',
                role: existingData.details?.role || '',
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
        <>
            <ToastContainer />
            <form className='form-container' onSubmit={handleSubmit((data) => onSubmit(data, 'draft'))}>
                <h3>Membership of network</h3>
                <p>Log all things related to membership of network here.</p>

                <div className='form-group'>
                    <label>Activity title</label>
                    <input placeholder='Title' {...register('title')} />
                </div>

                <div className='form-group'>
                    <label>Network name</label>
                    <input placeholder='Network name' {...register('networkName')} />
                    <label>Role</label>
                    <input placeholder='Role (PI, Co-I)' {...register('role')} />
                </div>

                <div className='form-group'>
                    <label>Scope</label>
                    <select {...register('scope')}>
                        <option>Local</option>
                        <option>National</option>
                        <option>International</option>
                    </select>
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

export default MembershipOfNetwork