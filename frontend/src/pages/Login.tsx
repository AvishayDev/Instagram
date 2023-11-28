import { Stack, TextField, Button, Box } from "@mui/material";

function Login() {
    return ( 
        <>  
            <Stack spacing={4} position="absolute">
                <TextField
                    label='Username'
                    />
                <TextField
                    label='Password'
                    />
                <Stack spacing={2} direction='row'>
                    <Button variant="outlined" fullWidth>Register</Button>
                    <Button variant="contained" fullWidth>Login</Button>
                </Stack>
            </Stack>
        </>
    );
}

export default Login;