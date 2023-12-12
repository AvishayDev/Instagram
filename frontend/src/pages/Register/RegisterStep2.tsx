import { Stack, TextField, Typography } from "@mui/material";


function RegisterStep2() {
    return ( 
        <Stack spacing={4}>
            
            <Typography variant="h6">Username</Typography>
            
            <TextField
                label='Profile Image Url'
                />

            <Stack spacing={2} direction='row' justifyContent='space-between' >
                <TextField
                    label='First Name'
                    sx={{
                        width:'50%'
                    }}
                    />
                <TextField
                    label='Last Name'
                    sx={{
                        width:'50%'
                    }}
                    />
            </Stack>
        </Stack>
        );
}

export default RegisterStep2;