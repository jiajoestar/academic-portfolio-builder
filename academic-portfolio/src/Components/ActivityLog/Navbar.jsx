import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faCog } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css'

const Navbar = () => {
    return (
        <nav className='navbar'>
            <div className='navbar-left'>
                <div className='logo'></div>
                <h2 className='title'>Portfolio Builder</h2>
            </div>

            <div className='navbar-right'>
                <FontAwesomeIcon icon={faSearch} className='icon' />
                <FontAwesomeIcon icon={faUser} className='icon' />
                <FontAwesomeIcon icon={faCog} className='icon' />
            </div>
        </nav>
    );
}

export default Navbar