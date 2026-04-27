import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { saveActivity } from '../../Services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Examination = ({ onSaved, existingData, hideButtons = false, mode = 'draft', externalSubmitRef, readOnly = false }) => {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            title: '',
            institution: '',
            examType: '',
            candidateLevel: '',
            description: '',
            date: ''
        }
    })

    const token = localStorage.getItem('token')

    const onSubmit = async (data, status = mode) => {
        if (readOnly) return

        const payload = {
            ...data,
            type: 'examination',
            title: data.title,
            description: data.description,
            startDate: data.date,
            status: status,
            details: {
                institution: data.institution,
                examType: data.examType,
                candidateLevel: data.candidateLevel
            },
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
            
            console.log(res)
            console.log('PYALOAD:', payload)
            console.log('FORM DATA:', data)

            toast.success(status === 'published' ? 'Activity published to profile' : 'Draft saved')

            if (onSaved) {
                try {
                    await onSaved()
                } catch (callbackErr) {
                    console.error('Activity saved, but refresh callback failed:', callbackErr)
                }
            }

            if (!existingData) reset()
        } catch (err) {
            console.error(err)
            toast.error(status === 'published' ? 'Error publishing activity' : 'Error saving draft')
        }
    }

    useEffect(() => {
        if (existingData) {
            reset({
                title: existingData.title || '',
                institution: existingData.details?.institution || '',
                examType: existingData.details?.examType || '',
                candidateLevel: existingData.details?.candidateLevel || '',
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
            <form className='form-container' onSubmit={handleSubmit((data) => onSubmit(data, 'draft'))}>
                <fieldset disabled={readOnly} style={{ border: 'none', padding: 0, margin: 0 }}>
                    <h3>Examiner</h3>
                    <p>Log all things related to being examiner here.</p>

                    <div className='form-group'>
                        <label>Activity title</label>
                        <input placeholder='Title' {...register('title')} />
                    </div>

                    <div className='form-group'>
                        <label>Institution</label>
                        <input placeholder='Institution' {...register('institution')} />
                        <label>Examiner type</label>
                        <input type='radio' name='PhD' {...register('examType')} />
                        <input type='radio' name='External' {...register('examType')} />
                        <input type='radio' name='Internal' {...register('examType')} />
                        <label>Candidate level</label>
                        <input placeholder='Candidate level' {...register('candidateLevel')} />
                    </div>

                    <div className='form-group'>
                        <label>Description</label>
                        <textarea placeholder='Description' {...register('description')} />
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

export default Examination