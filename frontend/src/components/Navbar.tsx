import {BottomNavigation, BottomNavigationAction} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
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
            <BottomNavigationAction label='Feed' icon={<HomeIcon/>}/>
            <BottomNavigationAction label='Post' icon={<AddToPhotosIcon/>}/>
            <BottomNavigationAction label='Profile' icon={<PersonIcon/>}/>
        </BottomNavigation>
     );
}

export default NavBar;