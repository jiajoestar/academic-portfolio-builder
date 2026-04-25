import React, { useEffect } from 'react';
import './Forms.css'
import { useForm } from 'react-hook-form';
import { saveActivity } from '../../Services/api';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const PeerReview = ({ onSaved, existingData, hideButtons = false, mode = 'draft', externalSubmitRef, readOnly = false }) => {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            title: '',
            reviewType: '',
            journal: '',
            description: '',
            date: ''
        }
    })

    const token = localStorage.getItem('token')

    const onSubmit = async (data, status = mode) => {
        if (readOnly) return

        const payload = {
            ...data,
            type: 'peer_review',
            title: data.title,
            description: data.description,
            startDate: data.date,
            details: {
                reviewType: data.reviewType,
                journal: data.journal
            },
            status: status,
            pinned: existingData?.pinned || false
        }

        try {
            let res

            if (existingData?._id) {
            // UPDATE
            res = await axios.put(
                `${import.meta.env.VITE_API_URL}/api/activities/${existingData._id}`,
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
                reviewType: existingData.details?.reviewType || '',
                journal: existingData.details?.journal || '',
                description: existingData.description || '',
                date: existingData.startDate
                    ? new Date(existingData.startDate).toISOString().split('T')[0]
                    : ''
            })
        }
    }, [existingData, reset])

    useEffect(() => {
        if (!externalSubmitRef || readOnly) return

        externalSubmitRef.current = {
            save: handleSubmit((data) => onSubmit(data, mode)),
            publish: handleSubmit((data) => onSubmit(data, 'published'))
        }
    }, [externalSubmitRef, handleSubmit, existingData, mode, readOnly])

    return (
        <>
            {!readOnly && <ToastContainer />}
            <form className='form-container' onSubmit={handleSubmit((data) => onSubmit(data, mode))}>
                <fieldset disabled={readOnly} style={{ border: 'none', padding: 0, margin: 0 }}>
                    <h3>Peer review and editorial activity</h3>
                    <p>Log all things related to peer-reviews and editorial actvity here.</p>

                    <div className='form-group'>
                        <label>Activity title</label>
                        <input {...register('title')} />
                    </div>

                    <div className='form-group'>
                        <label>Review type</label>
                        <select {...register('reviewType')}>
                            <option>Funding body peer review</option>
                            <option>Collaborative review</option>
                            <option>Post-publication review</option>
                        </select>
                    </div>

                    <div className='form-group'>
                        <label>Description</label>
                        <textarea {...register('description', { required: true })} />
                    </div>

                    <div className='form-group'>
                        <label>Journal/organisation</label>
                        <input {...register('journal')} />
                    </div>

                    <div className='form-group form-group-dates'>
                        <label>Date</label>
                        
                        <input type='date' {...register('date')} />
                        
                    </div>
                </fieldset>

                
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

export default PeerReview