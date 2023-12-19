import { Box, Button, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { IMAGES } from "../consts/Images";
import { useFormik } from "formik";
import { isEmpty, isNotEmpty, isURL } from "class-validator";
import { useLazySharePostQuery } from "../redux/features/Api/posts/postsApiSlice";
import useLocalStorage from "../Hooks/useLocalStorage";
import { User } from "../redux/features/Api/users/types/User";
import AutoClosePopup from "../components/AutoClosePopup";
import { useState } from "react";

interface FormErrors {
    imageUrl?:string,
    postText?:string
}



function Share() {

    const [user] = useLocalStorage<User>('user');
    const [trigger,] = useLazySharePostQuery();
    
    const [openError,setOpenError] = useState(false);
    const [openSuccess,setOpenSuccess] = useState(false);

    const formik = useFormik({
            initialValues: {
                imageUrl:'',
                postText:''
            },
            onSubmit: async (values, formikHelpers)=>{
                
                const sendValues = Object.fromEntries(
                                        Object.entries(values)
                                          .filter(([_,value]) => value)
                                                );
                                                      
                const {isError, isSuccess}= await trigger({
                                userId:user.id,
                                ...sendValues
                            });
                
                setOpenError(isError)
                setOpenSuccess(isSuccess)
                
                if (isSuccess)
                    formikHelpers.resetForm()

                    
            },
            validate: (values) => {
                const errors:FormErrors = {};

                if (values.imageUrl && !isURL(values.imageUrl))
                    errors.imageUrl = 'Please provide valid URL'

                return errors;
            },
    });

    return ( 
        <>
            <AutoClosePopup 
                message="Something went wrong, Please try again.."
                open={openError}
                color="error"
                onClose={()=>setOpenError(false)}
                />
            <AutoClosePopup 
                message="Yeah! You're Post is Uploaded!"
                open={openSuccess}
                color="success"
                onClose={()=>setOpenSuccess(false)}
                />
            <Stack spacing={3} marginTop={3}>

                <Typography variant="h4">Let's Post Something!</Typography>
                    <Box   
                        component='img'
                        sx={{
                            width:'200px',
                            height:'200px',
                            boxShadow:2,
                            alignSelf:'center'
                            
                        }}
                        src={isURL(formik.values.imageUrl) ? formik.values.imageUrl : IMAGES.defaultPostImage}
                        />
                        <TextField
                            label='Image Url'
                            name="imageUrl"
                            helperText={formik.errors.imageUrl}
                            error={!!formik.errors.imageUrl}
                            onChange={formik.handleChange}
                            value={formik.values.imageUrl}
                            />
                        
                        <TextField
                            label='Write Something...'
                            name="postText"
                            helperText="You dosen't have to.. but, its recommended!"
                            onChange={formik.handleChange}
                            value={formik.values.postText}
                            />
                        <Button variant="contained" onClick={()=>formik.handleSubmit()}>
                            Publish!
                        </Button>       
            </Stack>
        </>
        );
}

export default Share;