import React from 'react'

const Contact = () => {
    return (
        <div className='contact-page-wrapper'>
            <h1 className='primary-heading'>Enquiries</h1>
            <div className='contact-form-container'>
                <input type='text' placeholder='Write your message here'/>
                <input type='email' placeholder='Email'/>
                <button className='secondary-button'>Submit</button>
            </div>
        </div>
    );
}

export default Contact