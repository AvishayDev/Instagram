import { Stack, TextField, Typography, Box } from "@mui/material";
import { TextareaAutosize } from '@mui/base';
import { useFormikContext } from "formik";
import { RegisterUser } from "../../redux/features/Api/users/types/RegisterUser";
import { IMAGES } from "../../consts/Images";



function RegisterStep3() {


    const formik = useFormikContext<RegisterUser>()

    return ( 
        <Stack spacing={4}>
            
            <Box   
                component='img'
                sx={{
                    width:'100px',
                    height:'100px',
                    borderRadius:'100%',
                    alignSelf:'center',
                    boxShadow:3
                    }}
                loading="lazy"
                src={formik.values.profileImageUrl ? formik.values.profileImageUrl : IMAGES.defaultUserProfileImage}    
                />
            
            <Box>
                <Stack spacing={1} direction='row' justifyContent='center'>
                    <Typography>{formik.values.firstName}</Typography>
                    <Typography>{formik.values.lastName}</Typography>
                </Stack>
                <Typography variant="h6">{formik.values.username}</Typography>
            </Box>
            
            <TextField 
                    label='Bio'
                    name="bio"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.bio}
                    error={!!formik.errors.bio}
                    helperText={!formik.values.bio && "You don't have to, but it's cool!"}
    
                    />

        </Stack>
        );
}

export default RegisterStep3;