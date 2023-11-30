import { Box, Button, Stack, Typography } from "@mui/material";
import { Outlet } from "react-router";
import { RegisterProvider } from "./RegisterContext";

interface RegisterProps {
    hasBack:boolean
    hasNext:boolean
}

function Register() {
    return ( 
        <RegisterProvider>

            <Box sx={{width:'50vw', marginTop:4}}>

                <Box sx={{marginBottom:4}}>
                    <Typography variant="h4" >Let's Register!</Typography>
                    <Typography variant="subtitle1">Just Few Steps and Your'e In!</Typography>
                </Box>

                <Outlet/>
                
                <Box sx={{
                    display:'flex',
                    justifyContent: 'space-between',
                    marginTop: 4
                    }}>
                    <Button variant="outlined"  sx={{height:'40px'}}>Back</Button>
                    <Button variant="contained" sx={{height:'40px'}}>Next</Button>
                </Box>
            </Box>
        </RegisterProvider>
    );
}

export default Register;