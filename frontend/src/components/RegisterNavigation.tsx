import { LoadingButton } from "@mui/lab";
import { Box, Button } from "@mui/material";
import { ButtonsText } from "../consts/enums/ButtonsText";



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
                        {ButtonsText.BACK}
                </Button>
                <LoadingButton 
                    variant="contained" 
                    sx={{height:'40px'}}
                    onClick={props.onNext}
                    loading={props.isLoading}
                    >
                        {props.currentPage === 3 ? ButtonsText.DONE : ButtonsText.NEXT}
                </LoadingButton>
        </Box>
     );
}

export default RegisterNavigation;