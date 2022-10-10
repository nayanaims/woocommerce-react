import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import React, { useState } from 'react'

const Footer = () => {
    
    const [value, setValue] = useState(0)
    
    return (
        <BottomNavigation
            sx={{
                position: 'fixed',
                left: 0,
                right: 0,
                bottom:0
            }}
            showLabels
            value={value}
            onChange={(event, newValue) => {
                console.log(newValue);
                setValue(newValue);
            }}
        >
            <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
            <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
        </BottomNavigation>
    )
}
export default Footer;