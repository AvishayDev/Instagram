import { LoadingButton } from "@mui/lab";
import { Box, Button } from "@mui/material";



interface RegisterNavigationProps {
    onBack?: ()=> void
    onNext?: ()=> void
    isLoading?: boolean
    currentPage?:number
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
                <LoadingButton 
                    variant="contained" 
                    sx={{height:'40px'}}
                    onClick={props.onNext}
                    loading={props.isLoading}
                    >
                        {props.currentPage === 3 ? 'Done' : 'Next'}
                </LoadingButton>
        </Box>
     );
}

export default RegisterNavigation;