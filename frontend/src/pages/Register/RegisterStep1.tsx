import { IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { useLazyCheckUsernameQuery } from "../../redux/features/Api/users/usersApiSlice";
import { useEffect, useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
import { useFormikContext } from "formik";
import RefreshIcon from '@mui/icons-material/Refresh';
import { RegisterUser } from "../../redux/features/Api/users/types/RegisterUser";



function RegisterStep1() {
    
    const [trigger,{isFetching :isServerLoading,isError,data,isSuccess}] = useLazyCheckUsernameQuery();
    const [isLoading,setIsLoading] = useState(false)
    const [typingTimeout,setTypingTimeout] = useState<NodeJS.Timeout>();
    
    const formik = useFormikContext<RegisterUser>();

    useEffect(()=>{
        clearTimeout(typingTimeout);

        (isLoading && !formik.errors.username) && setTypingTimeout(setTimeout(()=> callServer()
        ,1000))

        return () => clearTimeout(typingTimeout)
    },[formik.values.username,formik.errors.username])

    useEffect(()=>{
        formik.errors.username && clearTimeout(typingTimeout)
    }, [formik.errors.username, typingTimeout])


    const callServer = async ()=> !formik.errors.username && await trigger(formik.values.username);
    useEffect(()=>setIsLoading(isServerLoading),[isServerLoading])
    
    return ( 
        <Stack spacing={4}>
            <TextField
                label='Username'
                name="username"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            {(isError && <IconButton onClick={callServer}><RefreshIcon/></IconButton>)||
                            ((!formik.errors.username && !data?.exists) &&
                                <>
                                    {isLoading ? <CircularProgress size={25}/>
                                     : (isSuccess && <CheckIcon/>)}
                                </>)
                            }
                        </InputAdornment>
                    )
                }}
                error={isError || !!formik.errors.username || data?.exists}
                
                onChange={(event)=>{formik.handleChange(event); setIsLoading(true);}}
                onBlur={formik.handleBlur}
                helperText={formik.errors.username ||
                            (isError && "Sorry.. we have server error.. please try again") || 
                            (data?.exists  && 'Username already Exists')}
                value={formik.values.username}
                    />
            <TextField
                type="password"
                label='Password'
                name='password'
                onChange={formik.handleChange}
                error={formik.touched.password && !!formik.errors.password}
                helperText={formik.touched.password && formik.errors.password}
                value={formik.values.password}
                />
            <TextField
                type="password"
                label='Re-password'
                name="rePassword"
                onChange={formik.handleChange}
                error={formik.touched.rePassword && !!formik.errors.rePassword}
                helperText={formik.touched.rePassword && formik.errors.rePassword}
                value={formik.values.rePassword}
                />


        </Stack> 
        );
}

export default RegisterStep1;


