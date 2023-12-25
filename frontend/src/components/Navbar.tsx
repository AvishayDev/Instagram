import {BottomNavigation, BottomNavigationAction} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Paths } from '../consts/enums/Paths';


const NavigateValues: string[] = [
    Paths.FEED,
    Paths.SHARE,
    Paths.PROFILE
]

enum Labels {
    FEED='Feed', 
    SHARE='Share', 
    PROFILE='Profile'
}


function NavBar() {

    const location = useLocation();

    const [value,setValue] = useState(NavigateValues.findIndex((value)=> value === location.pathname));
    const navigate = useNavigate();
    
    const handleNavigation = (event:any, newValue:number) => {
        setValue(newValue)
        navigate(NavigateValues[newValue])
    }

    return ( 
        <BottomNavigation 
                sx={{ 
                    width:'100%', 
                    position: 'sticky', 
                    borderTop: '#d3d3d3 solid 1px',
                    bottom:0
                }}
                value={value}
                onChange={handleNavigation}>
            <BottomNavigationAction label={Labels.FEED}    icon={<HomeIcon/>}/>
            <BottomNavigationAction label={Labels.SHARE}   icon={<AddToPhotosIcon/>}/>
            <BottomNavigationAction label={Labels.PROFILE} icon={<PersonIcon/>}/>
        </BottomNavigation>
     );
}

export default NavBar;