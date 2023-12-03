import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router";


interface HeaderProps {
    text:string
}

function Header() {
    const location = useLocation();
    return ( 
        <AppBar position="static" sx={{bgcolor:'#EFEFEF',color:'#151515',alignItems:'center',marginBottom:1}}>
            <Toolbar>
                <Typography variant="h5">{location.pathname}</Typography>
            </Toolbar>
        </AppBar>
     );
}

export default Header;