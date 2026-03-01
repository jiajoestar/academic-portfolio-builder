import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faBars } from '@fortawesome/free-solid-svg-icons'
import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// import Logo from '../Assets/logo.svg'
// add search bar to navbar

const Navbar = () => {

    const [openMenu, setOpenMenu] = useState(false);
    const menuOptions = [
        {
            text: "Home",
            icon:<FontAwesomeIcon icon={faHouse} />,
        },
        {
            text: "About",
            icon:<FontAwesomeIcon icon={faHouse} />,
        },
        {
            text: "Contact",
            icon:<FontAwesomeIcon icon={faHouse} />,
        },
    ];
    const navigate = useNavigate();

    return (
        <nav>
            <div className='nav-logo-container'>
                
            </div>
            <div className='navbar-links-container'>
                <Link to='/'>Home</Link>
                <Link to='/about'>About</Link>
                <Link to='/contact'>Contact</Link>
                <button className='primary-button' onClick={() => navigate("/login")}>Log in / Register</button>
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
    );
}

export default Navbar