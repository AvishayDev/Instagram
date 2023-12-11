import { Box, Button } from "@mui/material";
import LinkButton from "./LinkButton";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function RegisterNavigation() {

    const registerFlow = [
        '/login',
        '/register/1',
        '/register/2',
        '/register/3',
        '/feed'
    ]
    const location = useLocation();

    const [currentPage,setCurrentPage] = useState(registerFlow.findIndex((path)=>(path === location.pathname)))


    useEffect(()=>{
        setCurrentPage(registerFlow.findIndex((path)=>(path === location.pathname)))
    },[location])

    return ( 
        <Box sx={{
            display:'flex',
            justifyContent: 'space-between',
            marginTop: 4
            }}>
            <LinkButton to={registerFlow[currentPage - 1]}
                        variant="outlined"  
                        sx={{height:'40px'}}>Back</LinkButton>
            <LinkButton to={registerFlow[currentPage + 1]}
                        variant="contained" 
                        sx={{height:'40px'}}>{currentPage === 3 ? 'Done': 'Next'}</LinkButton>
        </Box>
     );
}

export default RegisterNavigation;