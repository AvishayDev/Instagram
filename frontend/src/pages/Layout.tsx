import { Outlet } from "react-router";
import Header from "../components/Header";
import NavBar from "../components/Navbar";
import { Box } from "@mui/material";

interface LayoutProps {
    hasNavbar: boolean
}
function Layout(props:LayoutProps) {

    return ( 
        <Box sx={{ 
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            }}>

            <Header/>
            <Box sx={{
                display:'flex',
                justifyContent:'center',
                flex:1,
            }}>
                <Outlet/>
            </Box>
            
            {props.hasNavbar && <NavBar/>}
        </Box>
     );
}

export default Layout;