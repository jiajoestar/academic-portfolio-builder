import React from 'react';

const ActionCard = ({ onOpen }) => {
    return (
        <div className='action-card'>
            <div>
                <h3>Download your profile</h3>
                <p>Download your profile as a portfolio</p>
            </div>

            <button onClick={onOpen} className='quick-add-button'>Download</button>
        </div>
    );
}

export default ActionCard