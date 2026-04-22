import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faBars, faSearch } from '@fortawesome/free-solid-svg-icons';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../Assets/logo.svg';

const PublicNavbar = () => {

    const [openMenu, setOpenMenu] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate()
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])

    /*
    const handleSearch = async (value) => {
        setQuery(value)

        const res = await fetch(`http://localhost:5000/api/search?q=${value}`)
        const data = await res.json()
    }
    */

    const handleSubmit = (e) => {
        e.preventDefault()
        const trimmed = query.trim()
        if (!trimmed) return
        navigate(`/search?q=${encodeURIComponent(trimmed)}`)
    }

    const menuOptions = [
        {
            text: "Home",
            icon:<FontAwesomeIcon icon={faHouse} />,
        },
        {
            text: "About",
            icon:<FontAwesomeIcon icon={faHouse} />,
        }
    ]

    return (
        <nav>
            <Link to='/' className='nav-logo-container'>
                <img src={logo} alt="logo" />
                <span className='nav-logo-text'>Case Portfolio</span>
            </Link>

            <div className='navbar-links-container'>
                <Link to='/'>Home</Link>
                <Link to='/about'>About</Link>
                

                <div className='navbar-actions'>
                    <form className='search-form' onSubmit={handleSubmit}>
                        <input type='text' placeholder='Search author' value={query} onChange={(e) => setQuery(e.target.value)} className='search-input'/>
                        
                        <button type='submit' className='search-button'><FontAwesomeIcon icon={faSearch} /></button>
                    </form>
                    <button className='primary-button' onClick={() => navigate('/login')}>Log in / Register</button>
                </div>   
            </div>

            <div className='navbar-menu-container'>
                <FontAwesomeIcon 
                icon={faBars} 
                onClick={() => setOpenMenu(true)}
                />
            </div>
            <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor='right'>
                <Box sx={{width: 250}}
                role = 'presentation'
                onClick={() => setOpenMenu(false)}
                onKeyDown={() => setOpenMenu(false)}>
                    <List>
                        {menuOptions.map((item) => (
                            <ListItem key={item.text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </nav>
    )
}

export default PublicNavbar