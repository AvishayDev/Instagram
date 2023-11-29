import { Stack, TextField } from "@mui/material";

function RegisterStep1() {
    return ( 
        <Stack spacing={4}>
            <TextField
                label='Username'
                    />
            <TextField
                type="password"
                label='Password'
                />
            <TextField
                type="password"
                label='Re-password'
                />
        </Stack> 
        );
}

export default RegisterStep1;


