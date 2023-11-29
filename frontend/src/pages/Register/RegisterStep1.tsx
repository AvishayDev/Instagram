import { Stack, TextField } from "@mui/material";

function RegisterStep1() {
    return ( 
        <Stack spacing={4}>
            <TextField
                label='Username'
                    />
            <TextField
                label='Password'
                />
            <TextField
                label='Re-password'
                />
        </Stack> 
        );
}

export default RegisterStep1;


