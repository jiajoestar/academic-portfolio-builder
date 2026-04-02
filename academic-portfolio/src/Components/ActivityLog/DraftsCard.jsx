import React from 'react';

const DraftsCard = ({ activities, saveDraft, onPublish }) => {
    const drafts = activities.filter(a => a.status === 'draft')

    if (drafts.length === 0) return <p>No drafts yet.</p>

    return (
        <div className='drafts-section'>
            <h3>Drafts ({drafts.length})</h3>

            {drafts.map(a => {
                const lastEdited = new Date(a.updatedAt || a.createdAt)
                const isRecentlyEdited = Date.now() - new Date(a.updatedAt || a.createdAt) < 5 * 60 * 1000

                return (
                    <div key={a._id} className='draft-card'>
                        <div className='draft-header'>
                            <strong>{a.title || a.type}</strong>
                            {isRecentlyEdited && (
                                <span className='unsaved-badge'>Unsaved changes</span>
                            )}
                        </div>

                        <p>{a.description}</p>

                        <small>Last edited: {lastEdited.toLocaleString()}</small>

                        <div className='draft-actions'>
                            <button onClick={() => saveDraft(a)}>Save</button>
                            <button onClick={() => onPublish(a)}>Publish</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default DraftsCard