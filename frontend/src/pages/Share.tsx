import { AlertColor, Box, Button, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { IMAGES } from "../consts/Images";
import { useFormik } from "formik";
import { useLazySharePostQuery } from "../redux/features/Api/posts/postsApiSlice";
import useLocalStorage from "../Hooks/useLocalStorage";
import { User } from "../redux/features/Api/users/types/User";
import AutoClosePopup from "../components/AutoClosePopup";
import { useEffect, useState } from "react";
import * as Yup from 'yup';
import { clearFormValues } from "../HelpFunctions";
import { Timings } from "../consts/enums/Timings";
import { Messages } from "../consts/enums/Messages";
import { Titles } from "../consts/enums/Titles";
import { ButtonsText } from "../consts/enums/ButtonsText";
import { Colors } from "../consts/enums/Colors";
import { ValidationMessages } from "../consts/ValidationErrorMessages";
import { MaxLengths } from "../consts/MinMax";
import { Urls } from "../consts/Urls";


const validationSchema = Yup.object({
    imageUrl: Yup.string()
                    .url(ValidationMessages.VALID_URL)
                    .max(MaxLengths.IMAGE_URL,ValidationMessages.TOO_LONG_URL),

    postText: Yup.string().max(MaxLengths.POST_TEXT,ValidationMessages.TOO_LONG)
})

interface PopupProps {
    color: AlertColor
    message: Messages
}

const ErrorPopupProps: PopupProps = {
    color:Colors.ERROR,
    message:Messages.ServerError
}
const SuccessPopupPopup: PopupProps = {
    color:Colors.SUCCESS,
    message:Messages.PostUploaded
}


function Share() {

    const [user] = useLocalStorage<User>('user');
    const [trigger] = useLazySharePostQuery();
    
    const [openPopup,setOpenPopup] = useState(false);
    const [popupProps,setPopupProps] = useState<PopupProps>(ErrorPopupProps);

    const [disableShare,setDisableShare] = useState(false)


    const formik = useFormik({
            initialValues: {
                imageUrl:'',
                postText:''
            },
            onSubmit: async (values, formikHelpers)=>{
                const sendValues = clearFormValues({imageUrl:values.imageUrl,text:values.postText});
                            
                const {isSuccess}= await trigger({
                                userId:user.id,
                                ...sendValues
                            });
                
                setPopupProps(isSuccess ? SuccessPopupPopup : ErrorPopupProps)
                setOpenPopup(true)
                
                if (isSuccess){
                    formikHelpers.resetForm()
                    setDisableShare(true)
                    setTimeout(()=>setDisableShare(false),Timings.DisableShare)
                }       
            },
            validationSchema
    });

    return ( 
        <>
            {openPopup &&<AutoClosePopup
                            {...popupProps}
                            open={openPopup}
                            onClose={()=>setOpenPopup(false)}
                            />}
                
            <Stack spacing={3} marginTop={3} onKeyDown={event => event.key === 'Enter' && formik.handleSubmit()}>

                <Typography variant="h4">{Titles.Share1}</Typography>
                    <Box   
                        component='img'
                        sx={{
                            width:'200px',
                            height:'200px',
                            boxShadow:2,
                            alignSelf:'center'
                            
                        }}
                        src={(formik.values.imageUrl && !formik.errors.imageUrl) ? formik.values.imageUrl : IMAGES.defaultPostImage}
                        onDoubleClick={()=>window.open(Urls.PIXABAY, '_blank')}
                        />
                        <TextField
                            label='Image Url'
                            name="imageUrl"
                            helperText={formik.errors.imageUrl}
                            error={!!formik.errors.imageUrl}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.imageUrl}
                            />
                        
                        <TextField
                            label='Write Something...'
                            name="postText"
                            helperText={formik.values.postText ? formik.errors.postText : Messages.NotHaveTo}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.postText}
                            />
                        <Button disabled={disableShare} variant={disableShare ? 'outlined' : "contained"} onClick={()=>formik.handleSubmit()}>
                            {disableShare ? ButtonsText.ShareDisable : ButtonsText.ShareActive}
                        </Button>       
            </Stack>
        </>
        );
}

export default Share;