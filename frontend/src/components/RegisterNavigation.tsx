import { Box, Button } from "@mui/material";
import LinkButton from "./LinkButton";
import { useContext } from "react";
import { useRegisterContext } from "../pages/Register/RegisterContext";

function RegisterNavigation() {

    const {currentPage,nextPage,backPage,registerFlow} = useRegisterContext()

    return ( 
        <Box sx={{
            display:'flex',
            justifyContent: 'space-between',
            marginTop: 4
            }}>
            <LinkButton to={registerFlow[currentPage - 1]}
                        onClick={backPage} 
                        variant="outlined"  
                        sx={{height:'40px'}}>Back</LinkButton>
            <LinkButton to={registerFlow[currentPage + 1]}
                        onClick={nextPage} 
                        variant="contained" 
                        sx={{height:'40px'}}>Next</LinkButton>
        </Box>
     );
}

export default RegisterNavigation;