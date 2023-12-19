import { Box, Typography } from "@mui/material";
import { Outlet } from "react-router";
import RegisterNavigation from "../../components/RegisterNavigation";
import { useState } from "react";
import RegisterStep1 from "./RegisterStep1";
import RegisterStep2 from "./RegisterStep2";
import RegisterStep3 from "./RegisterStep3";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";


const initialPage = 1;
const endPage = 3;

function Register() {

    const [currentPage,setCurrentPage] = useState(initialPage);
    const navigate = useNavigate()

    // const formik = useFormik({

    // })


    const handleBack = ()=>{
        if (currentPage > initialPage)
            setCurrentPage(currentPage - 1)
        else
            navigate('/login')
    }

    const handleNext = ()=>{
        if (currentPage === endPage)
            setCurrentPage(initialPage)
        else
        setCurrentPage(currentPage + 1)
    }

    

    return ( 
        <Box sx={{width:'50vw', marginTop:4}}>

            <Box sx={{marginBottom:4}}>
                <Typography variant="h4" >Let's Register!</Typography>
                <Typography variant="subtitle1">Just Few Steps and Your'e In!</Typography>
            </Box>

            {currentPage === 1 && <RegisterStep1/>}
            {currentPage === 2 && <RegisterStep2/>}
            {currentPage === 3 && <RegisterStep3/>}
            
            <RegisterNavigation 
                    onBack={handleBack}
                    onNext={handleNext}
                    />
        </Box>
     );
}

export default Register;