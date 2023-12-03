import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router";
import { RoutesToPagesNameMapper } from "../consts/mappers/RoutesToPagesNameMapper";


interface HeaderProps {
    text:string
}

function Header() {
    const location = useLocation();
    const routeKey = location.pathname as keyof typeof RoutesToPagesNameMapper;

    return ( 
        <AppBar position="static" sx={{bgcolor:'#EFEFEF',color:'#151515',alignItems:'center',marginBottom:1}}>
            <Toolbar>
                <Typography variant="h5">{RoutesToPagesNameMapper[routeKey]}</Typography>
            </Toolbar>
        </AppBar>
     );
}

export default Header;