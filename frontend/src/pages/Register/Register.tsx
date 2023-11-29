import { Box, Button, Stack } from "@mui/material";
import { Outlet } from "react-router";



function Register() {
    return ( 
        <Box sx={{width:'50vw'}}>
            <Outlet/>
            
            <Box sx={{
                bgcolor:'red',
                display:'flex',
                justifyContent: 'space-between',
                marginTop: 4
                }}>
                <Button variant="outlined"  sx={{height:'40px'}}>Back</Button>
                <Button variant="contained" sx={{height:'40px'}}>Next</Button>
            </Box>
        </Box>
    );
}

export default Register;