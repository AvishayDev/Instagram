import { InputAdornment, Stack, TextField, TextFieldPropsColorOverrides } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { useLazyCheckUsernameQuery } from "../../redux/features/Api/users/usersApiSlice";
import useDataError from "../../Hooks/useDataError";
import { equals, isAlphanumeric, isNotEmpty } from "class-validator";
import { useEffect, useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
import { useStoreSelector } from "../../Hooks/storeHooks";


function RegisterStep1() {

    const [trigger,{isLoading}] = useLazyCheckUsernameQuery();

    //const {username,password,rePassword} = useStoreSelector(state=>state.register);

    const [username,setUsername,setUsernameError,resetUsernameError] = useDataError('');
    const [password,setPassword,setPasswordError,resetPasswordError] = useDataError('');
    const [rePassword,setRePassword,setRePasswordError,resetRePasswordError] = useDataError('');

    const [isSuccess,setIsSuccess] = useState(false);

    const checkUsername = async (usernameTest:string) => {

        setIsSuccess(false)

        if (!isAlphanumeric(usernameTest)){
            setUsernameError('username can be only letters and numbers');
            return
        } else resetUsernameError();

        const {isError, data} = await trigger(usernameTest);


        if (isError){
            return setUsernameError('internal error, please try again later');
        } else resetUsernameError();

        if (data?.exists)
            return setUsernameError('username already exists');
        else
            setIsSuccess(true)
    }


    const validatePasswords = (passwordTest:string,rePasswordTest:string)=>{
        
        let testCheck = true;
        if (!isNotEmpty(passwordTest)){
            setPasswordError("password can't be empty");
            testCheck = false;
        } else resetPasswordError();

        if (!equals(passwordTest,rePasswordTest)){
            setRePasswordError('password and re-password have to match.');
            testCheck = false;
        } else resetRePasswordError();

        if (!testCheck) return // add disable to redux

        // add to redux and continue
    }


    useEffect(()=>{
        validatePasswords(password.data,rePassword.data)
    },[password.data, rePassword.data])


    return ( 
        <Stack spacing={4}>
            <TextField
                label='Username'
                error={username.isError}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            {isLoading && <CircularProgress size={25}/>}
                            {isSuccess && <CheckIcon/>}
                        </InputAdornment>
                    )
                }}
                onBlur={(event)=>checkUsername(event.target.value)}
                onChange={(event)=>setUsername(event.target.value)}
                helperText={username.error}
                    />
            <TextField
                type="password"
                label='Password'
                onChange={(event)=>setPassword(event.target.value)}
                error={password.isError}
                helperText={password.error}
                />
            <TextField
                type="password"
                label='Re-password'
                onChange={(event)=>setRePassword(event.target.value)}
                error={rePassword.isError}
                helperText={rePassword.error}
                />
        </Stack> 
        );
}

export default RegisterStep1;


