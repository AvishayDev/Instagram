import { Box, Button, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { IMAGES } from "../consts/Images";
import { useFormik } from "formik";
import { useLazySharePostQuery } from "../redux/features/Api/posts/postsApiSlice";
import useLocalStorage from "../Hooks/useLocalStorage";
import { User } from "../redux/features/Api/users/types/User";
import AutoClosePopup from "../components/AutoClosePopup";
import { useState } from "react";
import * as Yup from 'yup';
import { clearFormValues } from "../HelpFunctions";


const validationSchema = Yup.object({
    imageUrl: Yup.string()
                    .url('Please provide valid URL')
                    .max(512,'URL is too long, please provide short one')
})

function Share() {

    const [user] = useLocalStorage<User>('user');
    const [trigger] = useLazySharePostQuery();
    
    const [openError,setOpenError] = useState(false);
    const [openSuccess,setOpenSuccess] = useState(false);
    const [disableShare,setDisableShare] = useState(false)


    const formik = useFormik({
            initialValues: {
                imageUrl:'',
                postText:''
            },
            onSubmit: async (values, formikHelpers)=>{
                
                const sendValues = clearFormValues(values);
                                                      
                const {isError, isSuccess}= await trigger({
                                userId:user.id,
                                ...sendValues
                            });
                
                setOpenError(isError)
                setOpenSuccess(isSuccess)
                
                if (isSuccess){
                    formikHelpers.resetForm()
                    setDisableShare(true)
                    setTimeout(()=>setDisableShare(false),5000)
                }
                
                    
            },
            validationSchema
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
            <Stack spacing={3} marginTop={3} onKeyDown={event => event.key === 'Enter' && formik.handleSubmit()}>

                <Typography variant="h4">Let's Post Something!</Typography>
                    <Box   
                        component='img'
                        sx={{
                            width:'200px',
                            height:'200px',
                            boxShadow:2,
                            alignSelf:'center'
                            
                        }}
                        src={(formik.values.imageUrl && !formik.errors.imageUrl) ? formik.values.imageUrl : IMAGES.defaultPostImage}
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
                        <Button disabled={disableShare} variant="contained" onClick={()=>formik.handleSubmit()}>
                            {disableShare ? 'Wait 5 sesonds to publish again': 'Publish!'}
                        </Button>       
            </Stack>
        </>
        );
}

export default Share;