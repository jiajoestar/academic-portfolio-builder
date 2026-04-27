import React from 'react';
import Footer from '../Footer/Footer';
import PublicNavbar from '../Home/PublicNavbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Contact = () => {

    const handleSubmit = () => {
        toast.success('Enquiry sent!')
    }

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
                            <button className='secondary-button' onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
            <ToastContainer position='top-right' autoClose={3000} />
        </div>
    );
}

export default Contact