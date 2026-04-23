import React from 'react';

const PublicationModal = ({ publication, isOpen, onClose, onRemove }) => {
    if (!isOpen || !publication) return null;

    return (
        <div className='activity-log-overlay'>
            <div className='modal activity-edit-modal'>
                <div className='modal-header'>
                    <h2>Publication details</h2>
                    <button className='modal-close-button' onClick={onClose}>✕</button>
                </div>

                <div className='modal-body modal-body-single'>
                    <div className='modal-form-scroll' style={{ padding: "24px" }}>
                        <h3>{publication.title}</h3>

                        <p><strong>Journal:</strong> {publication.journal || 'N/A'}</p>
                        <p><strong>Date:</strong> {publication.date || 'N/A'}</p>
                        <p><strong>DOI:</strong> {publication.doi || 'N/A'}</p>
                        <p><strong>Cited by:</strong> {publication.citedByCount ?? 0}</p>
                        <p><strong>Creator:</strong> {publication.creator || 'N/A'}</p>

                        <p>
                        <strong>Authors:</strong>{' '}
                        {publication.authors?.length
                            ? publication.authors.map((a) => a.name).join(', ')
                            : 'N/A'}
                        </p>

                        <p><strong>Abstract:</strong></p>
                        <p>{publication.abstract || 'No abstract available.'}</p>
                    </div>

                    <div className='profile-activity-actions'>
                        {onRemove && (
                            <button type='button' className='delete-button' onClick={() => onRemove(publication._id)}>Remove Publication</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PublicationModal