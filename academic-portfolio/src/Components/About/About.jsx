import React from 'react'
import AboutBackground from '../Assets/about-background.png'

const About = () => {
    return (
        <div className='about-section-container'>
            <div className='about-background-image-container'>
                <img src={AboutBackground} alt=''/>
            </div>
            <div className='about-section-text-container'>
                <p className='primary-subheading'>About</p>
                <h1 className='primary-heading'>blah</h1>
                <p className='primary-text'>paragraph</p>
                <p className='primary-text'>paragraph</p>
                <div className='about-buttons-container'>
                    <button className='secondary-button'>Learn More</button>
                </div>
            </div>
        </div>
    );
}

export default About