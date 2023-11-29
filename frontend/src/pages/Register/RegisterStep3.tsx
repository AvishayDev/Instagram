import { Stack, TextField, Typography, Box } from "@mui/material";
import { TextareaAutosize } from '@mui/base';



function RegisterStep3() {
    return ( 
        <Stack spacing={4} sx={{width:'50vw'}}>
            
            <Box   
                component='div'
                sx={{
                    width:'100px',
                    height:'100px',
                    bgcolor:'blue',
                    borderRadius:'100%',
                    alignSelf:'center'
                    }}>
                    Profile Image
            </Box>
            
            <Box>
                <Stack spacing={1} direction='row' sx={{justifyContent:'center'}}>
                    <Typography>First</Typography>
                    <Typography>Last</Typography>
                </Stack>
                <Typography variant="h6">Username</Typography>
            </Box>
            
            <TextField 
                    label='Bio'
                    />

        </Stack>
        );
}

export default RegisterStep3;