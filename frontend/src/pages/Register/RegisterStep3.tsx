import { Stack, TextField, Typography, Box } from "@mui/material";
import { useFormikContext } from "formik";
import { RegisterUser } from "../../redux/features/Api/users/types/RegisterUser";
import { IMAGES } from "../../consts/Images";
import { Messages } from "../../consts/enums/Messages";



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
                src={formik.values.profileImageUrl || IMAGES.defaultUserProfileImage}    
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
                    helperText={!formik.values.bio && Messages.NotHaveTo}
    
                    />

        </Stack>
        );
}

export default RegisterStep3;