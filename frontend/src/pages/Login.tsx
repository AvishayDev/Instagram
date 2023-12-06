import { Stack, TextField, Button, Box, Typography } from "@mui/material";
import {IMAGES} from '../consts/Images'
import LinkButton from "../components/LinkButton";
import { useRegisterContext } from "./Register/RegisterContext";
import { useState } from "react";
import { useLazyLoginUserQuery } from "../redux/features/usersApi";

function Login() {

    const {nextPage} = useRegisterContext()
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    
    const [trigger,{data, isLoading, error, isError}] = useLazyLoginUserQuery();

    const handleLogin = async () =>{
        const test = await trigger({username,password}) 
        console.log(test)
    }

    return ( 
        <>  
            <Stack  spacing={4} 
                    flex={1} 
                    alignSelf='center' 
                    padding={8}
                    onKeyDown={event => event.key === 'Enter' && handleLogin()}>
                
                <Typography variant="h4" >Let's Login!</Typography>
                
                <TextField
                    label='Username'
                    // value={username}
                    onChange={(event)=>setUsername(event.target.value)}
                    />
                <TextField
                    type="password"
                    label='Password'
                    onChange={(event)=>setPassword(event.target.value)}

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
                    <Button 
                        variant="contained" 
                        fullWidth
                        onClick={handleLogin}
                        >
                        Login
                    </Button>
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