import React from 'react';

const QuickAdd = ({ onOpen }) => {
    return (
        <div className='quick-add-section'>
            <div>
                <h3>Quick Add</h3>
                <p>Log an activity within a few clicks</p>
            </div>

            <button onClick={onOpen} className='quick-add-button'>Get Started</button>
        </div>
    );
}

export default QuickAdd