import React from 'react';
import './ActivityLog.css'
import PeerReview from '../Forms/PeerReview';
import axios from 'axios';

const DraftModal = ({ draft, isOpen, onClose, onSave, onPublish, onDelete }) => {
    if (!isOpen || !draft) return null

    const renderForm = () => {
        const type = draft.type?.toLowerCase()

        if (['peer_review', 'peer-review', 'peerreview'].includes(type)) {
            return <PeerReview existingData={draft} onSaved={onSave} hideButtons />
        }

        return <>No form available for this activity type.</>
    }

    const handleDelete = async () => {
        console.log(draft._id)
        const token = localStorage.getItem('token')
        await axios.delete(`http://localhost:5000/api/activities/${draft._id}`,
            { headers: { Authorization: `Bearer ${token}` } }
        )

        await onDelete()
        onClose()
    }

    return (
        <div className='overlay'>
            <div className='modal animate' style={{ maxWidth: '700px' }}>
                <div className='modal-header'>
                    <h2>Edit draft</h2>
                    <button onClick={onClose}>✕</button>
                </div>

                <div className='modal-body'>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                        {renderForm()}
                    </div>

                    <div className='form-actions'>
                        <button onClick={handleDelete}>Delete</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default DraftModal