import {BottomNavigation, BottomNavigationAction} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import PersonIcon from '@mui/icons-material/Person';
import { useEffect, useState } from 'react';

function NavBar() {
    const [value,setValue] = useState(0);
    
    useEffect(()=>{
        console.log(value)
    },[value])
    
    return ( 
        <BottomNavigation 
                sx={{ 
                    width:'100%', 
                    position: 'absolute', 
                    borderTop: '#d3d3d3 solid 1px',
                    bottom:0}}
                value={value}
                onChange={(event,newValue)=> setValue(newValue)}>
            <BottomNavigationAction label='Home' icon={<HomeIcon/>}/>
            <BottomNavigationAction label='Feed' icon={<DynamicFeedIcon/>}/>
            <BottomNavigationAction label='Profile' icon={<PersonIcon/>}/>
        </BottomNavigation>
     );
}

export default NavBar;