import { AppBar, Toolbar, Typography } from "@mui/material";


interface HeaderProps {
    text:string
}

function Header() {
    return ( 
        <AppBar position="static" sx={{bgcolor:'#EFEFEF',color:'#151515',alignItems:'center'}}>
            <Toolbar>
                <Typography variant="h5">Text</Typography>
            </Toolbar>
        </AppBar>
     );
}

export default Header;