import { InputAdornment, Stack, TextField, TextFieldPropsColorOverrides } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { useLazyCheckUsernameQuery } from "../../redux/features/Api/users/usersApiSlice";
import useDataError from "../../Hooks/useDataError";
import { equals, isAlphanumeric, isNotEmpty } from "class-validator";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
import { useStoreSelector } from "../../Hooks/storeHooks";
import { FormikProps } from "formik";
import { RegisterUser } from "../../redux/features/Api/users/types/RegisterUser";


interface RegisterStep1Props {
    formik: FormikProps<RegisterUser>
}

function RegisterStep1(props:RegisterStep1Props) {

    const [trigger,{isLoading,isError,data,isSuccess}] = useLazyCheckUsernameQuery();

    const {formik} = props;

    // const firstTime = useRef(2)
    // useLayoutEffect(()=>{
    //     if (firstTime.current> 0){
    //         firstTime.current--;
    //         return
    //     }
    //     console.log('koko')
    //     const checkUsername = async ()=>{

    //         await trigger(formik.values.username)
    //     }
    //     !formik.errors.username && checkUsername()
    // },[formik.errors.username])


    // useEffect(()=>{
    //     console.log('useEffect')
    //     console.log(formik.touched.username)
    //     console.log(formik.errors.username)
    //     const checkUsername = async ()=>{
    //         console.log('trigger')
    //         await trigger(formik.values.username)
    //     }

    //     if (formik.touched.username && !formik.errors.username)
    //         checkUsername()
    // },[formik.touched.username])


    const checkUsername = async ()=>{
        if (formik.touched.username && !formik.errors.username) {
            console.log('trigger')
            await trigger(formik.values.username)
        }
    }

    return ( 
        <Stack spacing={4}>
            <TextField
                label='Username'
                name="username"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            {(!formik.errors.username && !isError && !data?.exists) &&
                            <>
                                {isLoading && <CircularProgress size={25}/>}
                                {isSuccess && <CheckIcon/>}
                            </>}
                        </InputAdornment>
                    )
                }}
                error={isError || !!formik.errors.username || data?.exists}
                onBlur={(error)=>{formik.handleBlur(error);checkUsername()}}
                onChange={formik.handleChange}
                helperText={isError || data?.exists  ? 'Username already Exists' : formik.errors.username}
                    />
            <TextField
                type="password"
                label='Password'
                name='password'
                onChange={formik.handleChange}
                error={formik.touched.password && !!formik.errors.password}
                helperText={formik.touched.password && formik.errors.password}
                />
            <TextField
                type="password"
                label='Re-password'
                name="rePassword"
                onChange={formik.handleChange}
                error={formik.touched.rePassword && !!formik.errors.rePassword}
                helperText={formik.touched.rePassword && formik.errors.rePassword}
                />
        </Stack> 
        );
}

export default RegisterStep1;


