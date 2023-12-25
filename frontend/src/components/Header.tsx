import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router";
import { RoutesPageNames } from "../consts/enums/RoutesPageNames";
import { Colors } from "../consts/enums/Colors";


function Header() {
    const location = useLocation();
    const routeKey = location.pathname as keyof typeof RoutesPageNames;

    return ( 
        <AppBar position="static" sx={{bgcolor:Colors.LIGHT_GRAY,color:Colors.BLACK,alignItems:'center',marginBottom:1}}>
            <Toolbar>
                <Typography variant="h5">{RoutesPageNames[routeKey]}</Typography>
            </Toolbar>
        </AppBar>
     );
}

export default Header;