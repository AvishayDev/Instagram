import { Box, Button } from "@mui/material";
import { useFormikContext } from "formik";



interface RegisterNavigationProps {
    onBack?: ()=> void
    onNext?: ()=> void
}


function RegisterNavigation(props:RegisterNavigationProps) {

    return ( 
        <Box sx={{
            display:'flex',
            justifyContent: 'space-between',
            marginTop: 4
            }}>
                <Button 
                    variant="outlined" 
                    sx={{height:'40px'}}
                    onClick={props.onBack}
                    >
                        Back
                </Button>
                <Button 
                    variant="contained" 
                    sx={{height:'40px'}}
                    onClick={props.onNext}
                    >
                        Next
                </Button>
        </Box>
     );
}

export default RegisterNavigation;