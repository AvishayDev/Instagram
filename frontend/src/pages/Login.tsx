import { Stack, TextField, Button, Box } from "@mui/material";
import {IMAGES} from './../Images'

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

                <img src={IMAGES.instagramIcon}/>
            </Stack>
        </>
    );
}

export default Login;