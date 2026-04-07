import React from 'react';
import AboutBackground from '../Assets/about-background.png';
import Navbar from '../Home/Navbar';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <>
            <Navbar />
            <div className="about-section-container">
                
                <div className="about-background-image-container">
                    <img src={AboutBackground} alt=''/>
                </div>
                <div className="about-section-text-container">
                    <br></br>
                    <h1 className="primary-heading">About Case</h1>
                    <p className="primary-text">
                        Case Portfolio is designed to make academics' lives easier. with simple, user-friendly UI and a smart 'Quick Add' feature,
                         making portfolios has never been so straightforward.
                    </p>
                    <p className="primary-text">
                        Got a busy schedule and don't have time to sit at your desk to update your profile with lengthy descriptions of events
                        you've attended? We got you. Our unique Quick Add feature allows for fast, easy activity logging - and if you need to leave
                        in a hurry, easily save the activity as a draft and come back to it another time. See all your activities in your user profile, 
                        and pin the activities that really matter to you, or ones you want to show off the most!
                    </p>
                    <p className="primary-text">
                        Register an account with us today for a seamless portfolio building experience.
                    </p>
                    <div className="about-buttons-container">
                        <Link to='/login'><button className="secondary-button">Get started</button></Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default About