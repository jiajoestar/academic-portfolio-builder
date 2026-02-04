import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faBars } from '@fortawesome/free-solid-svg-icons'


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

    return (
        <nav>
            <div className='nav-logo-container'>
                
            </div>
            <div className='navbar-links-container'>
                {/*i do not know if these work as this page is currently crashing and idk why*/}
                <a href='./Home.jsx'>Home</a>
                <a href='../About/About.jsx'>About</a>
                <a href='../Contact/Contact.jsx'>Contact</a>
                <button className='primary-button'>Log in / Register</button>
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