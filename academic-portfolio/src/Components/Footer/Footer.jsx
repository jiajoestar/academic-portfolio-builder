import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import logo from '../Assets/logo.svg';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-column">
                    <img src={logo} alt="logo" className="footer-logo"/>
                    <p className="footer-description">A quick portfolio builder tool for academics.</p>

                    <div className="footer-socials">
                        <FontAwesomeIcon icon={faInstagram}/>
                        <FontAwesomeIcon icon={faTwitter}/>
                        <FontAwesomeIcon icon={faGithub}/>
                    </div>
                </div>
                <div className="footer-column">
                    <span><Link to='/about'>About</Link></span>
                    <span><Link to='/contact'>Contact</Link></span>
                    <span>Account</span>
                </div>
                <div className="footer-column">
                    <span>+44 0000 000000</span>
                    <span>caseportfolio@fakeemail.com</span>
                </div>

                <div className="footer-bottom">© Case Portfolio. All rights reserved.</div>  
            </div>
        </footer>
    );
}

export default Footer