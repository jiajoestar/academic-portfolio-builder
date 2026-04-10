import React from 'react';
import './ActivityLog.css'

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
    return (
        <div className='overlay'>
            <div className='modal animate confirm-modal'>
                <h3>{message}</h3>

                <div className='confirm-actions'>
                    <button onClick={onCancel}>Cancel</button>
                    <button className='btn-danger' onClick={onConfirm}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal