import { Stack, TextField, Box, Typography } from "@mui/material";
import {IMAGES} from '../consts/Images'
import LinkButton from "../components/LinkButton";
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
import { MaxLengths, MinLengths } from "../consts/MinMax";
import { Messages } from "../consts/enums/Messages";
import { getValidationScheme } from "../Validation/ValidationFunctions";
import { useLazyLoginQuery } from "../redux/features/Auth/authApiSlice";
import { useStoreDispatch } from "../Hooks/storeHooks";
import { authSliceActions } from "../redux/features/Auth/authSlice";

const validationSchema = getValidationScheme(['username','password'])

function Login() {
    
    const [openError,setOpenError] = useState(false);

    const dispatch = useStoreDispatch();

    const [trigger,{isLoading}] = useLazyLoginQuery();

    const formik = useFormik({
        initialValues:{
            username:'',
            password:''
        },
        onSubmit: async (values)=>{
            const {isSuccess, data} = await trigger(values);

            if (isSuccess){
                dispatch(authSliceActions.setCredentials(data))
            } else
                setOpenError(true)
        },
        validationSchema
        
    })
    

    return ( 
        <>  
            {openError && <AutoClosePopup
                message={Messages.UsernameOrPasswordIncurrent}
                color={Colors.ERROR}
                open={openError}
                onClose={()=>setOpenError(false)}
                />}
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