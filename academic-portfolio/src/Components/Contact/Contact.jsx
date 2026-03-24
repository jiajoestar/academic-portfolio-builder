import React from 'react';
import Footer from '../Footer/Footer';

const Contact = () => {
    return (
        <div className="contact-page-wrapper">
            <h1 className="primary-heading">Enquiries</h1>
            <div className='contact-form'>
                <textarea className='contact-message' placeholder='Write your message here'/>
                <input className='contact-email' type='email' placeholder='Email'/>
                <button className="secondary-button">Submit</button>
            </div>
        <Footer />
        </div>
    );
}

export default Contact