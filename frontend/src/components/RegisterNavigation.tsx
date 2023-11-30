import { Box, Button } from "@mui/material";
import LinkButton from "./LinkButton";
import { useContext } from "react";
import { RegisterContext } from "../pages/Register/RegisterContext";

function RegisterNavigation() {

    const {currentPage} = useContext(RegisterContext)

    return ( 
        <Box sx={{
            display:'flex',
            justifyContent: 'space-between',
            marginTop: 4
            }}>
            <LinkButton to={`register/${currentPage}`}variant="outlined"  sx={{height:'40px'}}>Back</LinkButton>
            <LinkButton to={`register/${currentPage}`}variant="contained" sx={{height:'40px'}}>Next</LinkButton>
        </Box>
     );
}

export default RegisterNavigation;