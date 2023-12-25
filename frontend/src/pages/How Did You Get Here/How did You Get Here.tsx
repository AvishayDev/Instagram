import {  Stack, Typography } from "@mui/material";
import LinkButton from "../../components/LinkButton";
import { Messages } from "../../consts/enums/Messages";
import { Paths } from "../../consts/enums/Paths";

function HowDidYouGetHere() {

    return ( 
        <Stack spacing={4} margin={4} alignItems='center'>

            {/* <Typography variant="h1">
                Sound This!!
            </Typography> */}


            <LinkButton to={Paths.LOGIN} variant="contained">
                {Messages.Page404}
            </LinkButton>
        
        </Stack> );
}

export default HowDidYouGetHere;