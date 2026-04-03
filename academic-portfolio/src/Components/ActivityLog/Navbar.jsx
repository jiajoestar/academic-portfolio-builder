import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faCog } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../Assets/logo.svg';

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
                <img src={logo} className='logo' alt="logo" />
                <h2 className='title'>Portfolio Builder</h2>
            </div>

            <div className='navbar-right'>
                <Link to='/search'><FontAwesomeIcon icon={faSearch} className='icon' /></Link>
                <Link to='/profile'><FontAwesomeIcon icon={faUser} className='icon' /></Link>
                <Link to='/settings'><FontAwesomeIcon icon={faCog} className='icon' /></Link>
                <button className='logout-button' onClick={handleLogout}>Log out</button>
            </div>
        </nav>
    );
}

export default Navbar