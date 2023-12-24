import { Stack, TextField, Typography } from "@mui/material";
import { useFormikContext } from "formik";
import { RegisterUser } from "../../redux/features/Api/users/types/RegisterUser";


function RegisterStep2() {

    const formik = useFormikContext<RegisterUser>();


    return ( 
        <Stack spacing={4}>
            
            <Typography variant="h6">Hi! {formik.values.username}</Typography>
            
            <TextField
                label='Profile Image Url'
                name="profileImageUrl"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.profileImageUrl}
                error={!!formik.errors.profileImageUrl}
                helperText={formik.errors.profileImageUrl ? formik.errors.profileImageUrl : "You don't have to, but it's cool!"}
                />

            <Stack spacing={2} direction='row' justifyContent='space-between' >
                <TextField
                    label='First Name'
                    name="firstName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                    error={formik.touched.firstName && !!formik.errors.firstName}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                    sx={{
                        width:'50%'
                    }}
                    />
                <TextField
                    label='Last Name'
                    name="lastName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                    error={formik.touched.lastName && !!formik.errors.lastName}
                    helperText={formik.touched.lastName && formik.errors.lastName}

                    sx={{
                        width:'50%'
                    }}
                    />
            </Stack>
        </Stack>
        );
}

export default RegisterStep2;