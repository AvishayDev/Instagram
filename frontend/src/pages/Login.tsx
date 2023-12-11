import { Stack, TextField, Box, Typography } from "@mui/material";
import {IMAGES} from '../consts/Images'
import LinkButton from "../components/LinkButton";
import { useRegisterContext } from "./Register/RegisterContext";
import { useLazyLoginUserQuery } from "../redux/features/Api/users/usersApiSlice";
import { LoadingButton } from "@mui/lab";
import { isAlphanumeric, isNotEmpty } from "class-validator";
import useLocalStorage from "../Hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import useDataError from "../Hooks/useDataError";

function Login() {

    const {nextPage} = useRegisterContext();

    const [username,setUsername,setUsernameError,resetUsernameError] = useDataError('');
    const [password,setPassword,setPasswordError,resetPasswordError] = useDataError('');
    const [ _, setUser] = useLocalStorage('user');
    const navigate = useNavigate();

    const [trigger,{isLoading, isError}] = useLazyLoginUserQuery();

    const handleLogin = async () =>{

        let testCheck = true;
        if (!isAlphanumeric(username.data)){
            setUsernameError('username can be only letters and numbers');
            testCheck = false;
        } else resetUsernameError();

        if (!isNotEmpty(password.data)){
            setPasswordError("password can't be empty");
            testCheck = false;
        } else resetPasswordError();


        if (!testCheck) return

        const {isSuccess,isError, data, error} = await trigger({username: username.data, password: password.data});

        if (isError) {
            console.log('in')
            setPasswordError('username or password is incurrect');
            return
        }

        if (isSuccess){
            setUser(data);
            navigate('/feed');
        }


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
                    error={isError || username.isError}
                    onChange={(event)=>setUsername(event.target.value)}
                    helperText={username.error}
                    />
                <TextField
                    type="password"
                    label='Password'
                    error={password.isError || isError}
                    onChange={(event)=>setPassword(event.target.value)}
                    helperText={password.error}
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