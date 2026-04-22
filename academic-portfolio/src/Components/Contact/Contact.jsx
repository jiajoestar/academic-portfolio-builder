import React from 'react';
import Footer from '../Footer/Footer';
import PublicNavbar from '../Home/PublicNavbar';

const Contact = () => {
    return (
        <div className='marketing-page contact-page'>
            <PublicNavbar />

            <section className='contact-page-wrapper'>
                <div className='contact-page-inner'>
                    <h1 className='primary-heading'>Enquiries</h1>
                    <p className='primary-text contact-intro'>Have a question about Case Portfolio? Send us a message here.</p>

                    <div className='contact-form-card'>
                        <div className='contact-form'>
                            <textarea className='contact-message' placeholder='Write your message here'/>
                            <input className='contact-email' type='email' placeholder='Email'/>
                            <button className='secondary-button'>Submit</button>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default Contact