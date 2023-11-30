import { Box, Button, Typography } from "@mui/material";
import { Outlet } from "react-router";
import RegisterNavigation from "../../components/RegisterNavigation";


function Register() {
    return ( 
        <Box sx={{width:'50vw', marginTop:4}}>

            <Box sx={{marginBottom:4}}>
                <Typography variant="h4" >Let's Register!</Typography>
                <Typography variant="subtitle1">Just Few Steps and Your'e In!</Typography>
            </Box>

            <Outlet/>
            
            <RegisterNavigation/>
        </Box>
     );
}

export default Register;