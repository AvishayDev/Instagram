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
import { User } from "../redux/features/Api/users/types/User";
import { Titles } from "../consts/enums/Titles";
import { ButtonsText } from "../consts/enums/ButtonsText";
import { Colors } from "../consts/enums/Colors";
import { Paths } from "../consts/enums/Paths";
import { ValidationMessages } from "../consts/ValidationErrorMessages";
import { MaxLength } from "../consts/MinMax";

const validationSchema = Yup.object({
    username: Yup.string()
                .required(ValidationMessages.REQUIRED)
                .max(MaxLength.USERNAME,ValidationMessages.TOO_LONG)
                .test('isAlphanumeric',
                    'Username' + ValidationMessages.LETTERS_AND_NUMBERS,
                    (value)=>isAlphanumeric(value)),
    
    password: Yup.string()
                .required(ValidationMessages.REQUIRED)
                .max(MaxLength.PASSWORD,ValidationMessages.TOO_LONG)

        
})

interface LoginProps{
    onLogin:(user:User)=>void
}


function Login(props:LoginProps) {
    
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
                props.onLogin(data)
            } else
                setOpenError(true)
        },
        validationSchema
        
    })
    

    return ( 
        <>  
            <AutoClosePopup
                message="username or password are incorrect"
                color={Colors.ERROR}
                open={openError}
                onClose={()=>setOpenError(false)}
                />
            <Stack  spacing={4} 
                    flex={1} 
                    alignSelf='center' 
                    padding={8}
                    onKeyDown={event => event.key === 'Enter' && formik.handleSubmit()}>
                
                <Typography variant="h4" >{Titles.Login1}</Typography>
                
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
                            to={Paths.REGISTER}
                            fullWidth
                            >
                        {ButtonsText.REGISTER}
                    </LinkButton>
                    <LoadingButton 
                        variant="contained" 
                        fullWidth
                        loading={isLoading}
                        onClick={()=>formik.handleSubmit()}
                        >
                        {ButtonsText.LOGIN}
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