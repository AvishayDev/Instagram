import { Stack, TextField, Box, Typography } from "@mui/material";
import {IMAGES} from '../consts/Images'
import LinkButton from "../components/LinkButton";
import { useRegisterContext } from "./Register/RegisterContext";
import { useLazyLoginUserQuery } from "../redux/features/Api/usersApiSlice";
import { LoadingButton } from "@mui/lab";
import { useSelector,useDispatch } from "react-redux";
import { loginActions } from "../redux/features/Slices/loginSlice";
import { useEffect, useState } from "react";

function Login() {

    const {nextPage} = useRegisterContext();
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const username1 = useSelector((state)=>state)
    // const password = useSelector<StateType,LoginState>((state)=>state.login)
    const dispatch = useDispatch()
    
    const [trigger,{isLoading, isError}] = useLazyLoginUserQuery();


    useEffect(()=>{
        console.log(username1)
    },[username1])

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
                    onChange={(event)=>dispatch(loginActions.updateUsername(event.target.value))}
                    />
                <TextField
                    type="password"
                    label='Password'
                    error={isError}
                    onChange={(event)=>dispatch(loginActions.updatePassword(event.target.value))}
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