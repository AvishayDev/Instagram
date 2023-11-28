import { Outlet } from "react-router";
import Header from "../components/Header";
import NavBar from "../components/Navbar";

interface LayoutProps {
    navbar: boolean
}
function Layout(props:LayoutProps) {
    return ( 
        <>
            <Header/>
            
            <Outlet/>
            
            {props.navbar && <NavBar/>}
        </>
     );
}

export default Layout;