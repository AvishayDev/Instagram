import { AppBar, Toolbar, Typography } from "@mui/material";


interface HeaderProps {
    text:string
}

function Header() {
    return ( 
        <AppBar position="static">
            <Toolbar>
                
            </Toolbar>
        </AppBar>
     );
}

export default Header;