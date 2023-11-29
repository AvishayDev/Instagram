import { Outlet } from "react-router";
import Header from "../components/Header";
import NavBar from "../components/Navbar";
import { Box } from "@mui/material";

interface LayoutProps {
    hasNavbar: boolean
}
function Layout(props:LayoutProps) {
    return ( 
        <>
            <Header/>
                <Box sx={{
                    display:'flex',
                    justifyContent:'center',
                    width:'100vw'
                }}>
                    <Outlet/>
                </Box>
            
            {props.hasNavbar && <NavBar/>}
        </>
     );
}

export default Layout;