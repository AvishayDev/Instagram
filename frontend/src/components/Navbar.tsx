import {BottomNavigation, BottomNavigationAction} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const NavigateValues: string[] = [
    'feed',
    'share',
    'profile'
]


function NavBar() {
    const [value,setValue] = useState(0);
    const navigate = useNavigate();
    
    const handleNavigation = (event:any, newValue:number) => {
        setValue(newValue)
        navigate(`/${NavigateValues[newValue]}`)
    }

    return ( 
        <BottomNavigation 
                sx={{ 
                    width:'100%', 
                    position: 'absolute', 
                    borderTop: '#d3d3d3 solid 1px',
                    bottom:0}}
                value={value}
                onChange={handleNavigation}>
            <BottomNavigationAction label='Feed' icon={<HomeIcon/>}/>
            <BottomNavigationAction label='Share' icon={<AddToPhotosIcon/>}/>
            <BottomNavigationAction label='Profile' icon={<PersonIcon/>}/>
        </BottomNavigation>
     );
}

export default NavBar;