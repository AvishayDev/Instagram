import { Box, Button, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { IMAGES } from "../consts/Images";
import { useFormik } from "formik";
import { isURL } from "class-validator";


interface FormErrors {
    imageUrl?:string,
    postText?:string
}



function Share() {

    const formik = useFormik({
            initialValues: {
                imageUrl:'',
                postText:''
            },
            onSubmit: (values)=>{
                // fetch to the server
            },
            validate: (values) => {
                // enter every onChange
                const errors:FormErrors = {};

                if (values.imageUrl && !isURL(values.imageUrl))
                    errors.imageUrl = 'Please provide valid URL'

                return errors;
            },
    });

    return ( 
        <Stack spacing={4} marginTop={3}>
            <Typography variant="h4">Let's Post Something!</Typography>
                <Box   
                    component='img'
                    sx={{
                        width:'200px',
                        height:'200px',
                        boxShadow:2,
                        alignSelf:'center'
                        
                    }}
                    src={IMAGES.defaultPostImage}
                    />
            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={4}>
                    <TextField
                        label='Image Url'
                        name="imageUrl"
                        helperText={formik.errors.imageUrl}
                        error={!!formik.errors.imageUrl}
                        onChange={formik.handleChange}
                        />
                    
                    <TextField
                        label='Write Something...'
                        name="postText"
                        helperText="You dosen't have to.. but, its recommended!"
                        onChange={formik.handleChange}
                        />
                    <Button variant="contained" type="submit">
                        Publish!
                    </Button>
                </Stack>
            </form>
        </Stack>
        );
}

export default Share;