import { Stack, TextField, Box, Typography } from "@mui/material";
import {IMAGES} from '../consts/Images'
import LinkButton from "../components/LinkButton";
import { useRegisterContext } from "./Register/RegisterContext";
import { useState } from "react";
import { useLazyLoginUserQuery } from "../redux/features/usersApi";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";

function Login() {

    const {nextPage} = useRegisterContext()
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();
    
    const [trigger,{isLoading, isError}] = useLazyLoginUserQuery();


    const handleLogin = async () =>{
        // validate currect input

        const {isSuccess, data} = await trigger({username,password});
    
        if (isSuccess) return 
        // 1) add user to local storage
        // 2) navigate to /feed


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
                    error={isError}
                    onChange={(event)=>setUsername(event.target.value)}
                    />
                <TextField
                    type="password"
                    label='Password'
                    error={isError}
                    onChange={(event)=>setPassword(event.target.value)}
                    helperText={isError && 'username or password incurrect'}
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
                    <LoadingButton 
                        variant="contained" 
                        fullWidth
                        onClick={handleLogin}
                        loading={isLoading}
                        >
                        Login
                    </LoadingButton>
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