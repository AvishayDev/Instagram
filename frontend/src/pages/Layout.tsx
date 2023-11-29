import { Outlet } from "react-router";
import Header from "../components/Header";
import NavBar from "../components/Navbar";
import { Box } from "@mui/material";

interface LayoutProps {
    navbar: boolean
}
function Layout(props:LayoutProps) {
    return ( 
        <>
            <Header/>
                <Box sx={{
                    display:'flex',
                    justifyContent:'center',
                    bgcolor:'green',
                    width:'100vw'
                }}>
                    <Outlet/>
                </Box>
            
            {props.navbar && <NavBar/>}
        </>
     );
}

export default Layout;