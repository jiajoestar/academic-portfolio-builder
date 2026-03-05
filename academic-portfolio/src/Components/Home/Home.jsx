import React from 'react';
import Navbar from './Navbar';
import BannerBackground from '../Assets/home-banner-background.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Footer from '../Footer/Footer';

const Home = () => {
    return (
        <div className='home-container'>
            <Navbar />
            <div className='home-banner-container'>
                <div className='home-bannerImage-container'>
                    <img src={BannerBackground} alt=''/>
                </div>
                <div className='home-text-section'>
                    <h1 className='primary-heading'>Heading</h1>
                    <p className='primary-text'>paragraph</p>
                    <button className='secondary-button'>
                        Log in or Register <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                </div>
            </div>
            
        </div>
    );
}

export default Home