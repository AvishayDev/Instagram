import { Stack, TextField, Box, Typography } from "@mui/material";
import {IMAGES} from '../consts/Images'
import LinkButton from "../components/LinkButton";
import { useLazyLoginUserQuery } from "../redux/features/Api/users/usersApiSlice";
import { LoadingButton } from "@mui/lab";
import { isAlphanumeric, isEmpty, isNotEmpty } from "class-validator";
import useLocalStorage from "../Hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { FormikErrors, useFormik } from "formik";
import AutoClosePopup from "../components/AutoClosePopup";
import { useState } from "react";
import * as Yup from 'yup';

const validationSchema = Yup.object({
    username: Yup.string()
                .required('Did you forget something?')
                .max(50,"it's too long!")
                .test('isAlphanumeric',
                    'username can be only letters and numbers',
                    (value)=>isAlphanumeric(value)),
    
    password: Yup.string()
                .required('Did you forget something?')
                .max(100,"it's too long!")

        
})

function Login() {
    
    const [ _, setUser] = useLocalStorage('user');
    const navigate = useNavigate();
    const [openError,setOpenError] = useState(false)


    const [trigger,{isLoading}] = useLazyLoginUserQuery();

    const formik = useFormik({
        initialValues:{
            username:'',
            password:''
        },
        onSubmit: async (values)=>{
            const {isSuccess, data} = await trigger(values);

            if (isSuccess){
                setUser(data)
                navigate('/feed')
            } else
                setOpenError(true)
        },
        validationSchema
        
    })
    

    return ( 
        <>  
            <AutoClosePopup
                message="username or password are incorrect"
                color="error"
                open={openError}
                onClose={()=>setOpenError(false)}
                />
            <Stack  spacing={4} 
                    flex={1} 
                    alignSelf='center' 
                    padding={8}
                    onKeyDown={event => event.key === 'Enter' && formik.handleSubmit()}>
                
                <Typography variant="h4" >Let's Login!</Typography>
                
                <TextField
                    label='Username'
                    name="username"
                    error={!!formik.errors.username}
                    onChange={formik.handleChange}
                    helperText={formik.errors.username}
                    />
                <TextField
                    type="password"
                    label='Password'
                    name="password"
                    error={formik.touched.password && !!formik.errors.password}
                    onChange={formik.handleChange}
                    helperText={formik.touched.password && formik.errors.password}
                    />
                <Stack spacing={2} direction='row'>
                    <LinkButton 
                            variant="outlined" 
                            to="/register"
                            fullWidth
                            >
                        Register
                    </LinkButton>
                    <LoadingButton 
                        variant="contained" 
                        fullWidth
                        loading={isLoading}
                        onClick={()=>formik.handleSubmit()}
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