import { Stack, Typography } from "@mui/material";
import RefreshPageIcon from "./RefreshPageIcon";
import { Messages } from "../consts/enums/Messages";



function PageError() {
    return ( 
        <Stack>
            <Typography sx={{paddingTop:4}}>
                {Messages.ServerError}
            </Typography>
            <Typography variant="h5" sx={{paddingBottom:2}}>
                {Messages.Refresh}
            </Typography>
            <RefreshPageIcon sx={{alignSelf:'center'}}/>
        </Stack>
     );
}

export default PageError;