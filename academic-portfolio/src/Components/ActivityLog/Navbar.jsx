import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faCog } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = '/login'
    }

    return (
        <nav className='navbar'>
            <div className='navbar-left'>
                <div className='logo'></div>
                <h2 className='title'>Portfolio Builder</h2>
            </div>

            <div className='navbar-right'>
                <span onClick={() => navigate('/search')}><FontAwesomeIcon icon={faSearch} className='icon' /></span>
                <span onClick={() => navigate('/profile')}><FontAwesomeIcon icon={faUser} className='icon' /></span>
                <span onClick={() => navigate('/settings')}><FontAwesomeIcon icon={faCog} className='icon' /></span>
                <button className='logout-button' onClick={handleLogout}>Log out</button>
            </div>
        </nav>
    );
}

export default Navbar