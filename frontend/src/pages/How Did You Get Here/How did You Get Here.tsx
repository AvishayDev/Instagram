import {  Stack, Typography } from "@mui/material";
import LinkButton from "../../components/LinkButton";

function HowDidYouGetHere() {

    return ( 
        <Stack spacing={4} margin={4} alignItems='center'>

            {/* <Typography variant="h1">
                Sound This!!
            </Typography> */}


            <LinkButton to="/login" variant="contained">
                Let's Return to SAFE place...
            </LinkButton>
        
        </Stack> );
}

export default HowDidYouGetHere;