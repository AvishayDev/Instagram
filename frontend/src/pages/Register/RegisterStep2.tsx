import { Stack, TextField, Typography } from "@mui/material";


function RegisterStep2() {
    return ( 
        <Stack spacing={4}>
            
            <Typography variant="h6">Username</Typography>
            
            <TextField
                label='Profile Image Url'
                />

            <Stack spacing={2} direction='row'>
                <TextField
                    label='First Name'
                    />
                <TextField
                    label='Last Name'
                    />
            </Stack>
        </Stack>
        );
}

export default RegisterStep2;