import React from "react"

const Footer = () => {
    return (
        <div className="footer-wrapper">
            <div className="footer-section-one">
                <div className="footer-logo-container">
                    <img src={Logo} alt=''/>
                </div>
                <div className="footer-icons">
                    <p>#</p>
                    <p>#</p>
                </div>
            </div>
            <div className="footer-section-two">
                <div className="footer-section-columns">
                    <span>Quality</span>
                    <span>Help</span>
                    <span>Support</span>
                </div>
                <div className="footer-section-columns">
                    <span>phone number</span>
                    <span>email address</span>
                </div>
                <div className="footer-section-columns">
                    <span>Terms and Conditions</span>
                    <span>Privacy Policy</span>
                </div>
            </div>
        </div>
    );
}

export default Footer