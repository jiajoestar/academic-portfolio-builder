import React, { useState } from 'react';

const DraftsCard = ({ activities, saveDraft, onPublish, onSave, onEdit }) => {
    const drafts = activities.filter(a => a.status === 'draft')
    const [isOpen, setIsOpen] = useState(false)

    if (drafts.length === 0) return <p>No drafts yet.</p>

    console.log('Drafts:', drafts)

    return (
        <div className='drafts-section'>
            <h3 onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer' }}>Drafts ({drafts.length}) {isOpen ? '▲' : '▼'}</h3>

            {isOpen && drafts.map(a => {
                const lastEdited = new Date(a.updatedAt || a.createdAt)
                const isUnsaved = a.isDirty === true

                return (
                    <div key={a._id} className='draft-card' onClick={() => {
                        console.log('Clicked draft:', a)
                        onEdit(a)}}>
                        <div className='draft-header'>
                            <strong>{a.title || a.type}</strong>
                            
                        </div>

                        

                        <small>Last edited: {lastEdited.toLocaleString()}</small>

                    </div>
                )
            })}
        </div>
    )
}

export default DraftsCard