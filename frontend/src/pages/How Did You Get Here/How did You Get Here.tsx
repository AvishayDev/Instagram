import {  Stack, Typography } from "@mui/material";
import LinkButton from "../../components/LinkButton";
import { Messages } from "../../consts/enums/Messages";
import { Paths } from "../../consts/enums/Paths";
import { Titles } from "../../consts/enums/Titles";
import { Urls } from "../../consts/Urls";

function HowDidYouGetHere() {

    return ( 
        <Stack spacing={4} margin={4} alignItems='center'>

            <Typography variant="h1">
                {Titles.NonPage1}
            </Typography>
            <Typography variant="h2">
                {Titles.NonPage2}
            </Typography>
            
            <audio controls src={Urls.IrIr}/>

            <LinkButton to={Paths.LOGIN} variant="contained">
                {Messages.Page404}
            </LinkButton>
        
        </Stack> );
}

export default HowDidYouGetHere;