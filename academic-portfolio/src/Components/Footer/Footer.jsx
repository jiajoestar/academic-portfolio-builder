import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-column">
                    {/*<img src={Logo} alt="logo" className="footer-logo"/>*/}
                    <p className="footer-description">short description</p>

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
                    <span>email address</span>
                </div>

                <div className="footer-bottom">© portfolio builder. All rights reserved.</div>  
            </div>
        </footer>
    );
}

export default Footer