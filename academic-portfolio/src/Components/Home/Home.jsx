import React from 'react';
import PublicNavbar from './PublicNavbar';
import BannerBackground from '../Assets/home-banner-background.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className='marketing-page home-page'>
            <PublicNavbar />
            <section className='home-hero-container'>
                <div className='home-banner-container'>
                    <div className='home-bannerImage-container'>
                        <img src={BannerBackground} alt=''/>
                    </div>

                    <div className='home-text-section'>
                        <h1 className='primary-heading'>Case Portfolio</h1>
                        <p className='primary-text'>A quick portfolio builder tool for academics</p>
                        <p className='primary-text'>Building your portfolio has never been easier.</p>
                        <button className='secondary-button'>
                            <Link to='/login'>Sign up to create yours <FontAwesomeIcon icon={faArrowRight} /></Link>
                        </button>
                    </div>
                </div>
            </section>

            <section className='home-about-preview-section'>
                <div className='about-section-text-container'>
                    <p className='primary-text'>
                        Case Portfolio is designed to make academics' lives easier. with simple, user-friendly UI and a smart 'Quick Add' feature,
                            making portfolios has never been so straightforward.
                    </p>
                    <p className='primary-text'>
                        Simple UI. Save drafts. Pin your favourite activities and achievements to your profile. Search for other academics. Share your
                        profile as a portfolio. And do so much more with Case Portfolio.
                    </p>
                    <p className='primary-text'>
                        Register an account with us today for a seamless portfolio building experience.
                    </p>
                    <div className='about-buttons-container'>
                        <Link to='/login'><button className='secondary-button'>Get started</button></Link>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default Home