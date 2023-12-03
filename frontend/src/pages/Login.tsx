import { Stack, TextField, Button, Box, Typography } from "@mui/material";
import {IMAGES} from '../consts/Images'
import LinkButton from "../components/LinkButton";
import { useRegisterContext } from "./Register/RegisterContext";

function Login() {

    const {nextPage} = useRegisterContext()

    return ( 
        <>  
            <Stack spacing={4} width='50vw' alignSelf='center'>
                
                <Typography variant="h4" >Let's Login!</Typography>
                
                <TextField
                    label='Username'
                    />
                <TextField
                    type="password"
                    label='Password'
                    />
                <Stack spacing={2} direction='row'>
                    <LinkButton 
                            variant="outlined" 
                            to="/register/1"
                            fullWidth
                            onClick={nextPage}
                            >
                        Register
                    </LinkButton>
                    <Button variant="contained" fullWidth>Login</Button>
                </Stack>
                <Box>
                    <Box   
                        component='img'
                        sx={{
                            width:'100px',
                            height:'100px',
                        }}
                        src={IMAGES.instagramIcon}/>
                    <Box
                        component='img'
                        sx={{
                            width:'80%',
                        }}
                        src={IMAGES.instagramIconText}/>
                </Box>
            </Stack>
        </>
    );
}

export default Login;