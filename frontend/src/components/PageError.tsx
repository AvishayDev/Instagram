import { Stack, Typography } from "@mui/material";
import RefreshPageIcon from "./RefreshPageIcon";


function PageError() {
    return ( 
        <Stack>
            <Typography sx={{paddingTop:4}}>
                Something goes wrong...
            </Typography>
            <Typography variant="h5" sx={{paddingBottom:2}}>
                Left's refresh the page!
            </Typography>
            <RefreshPageIcon sx={{alignSelf:'center'}}/>
        </Stack>
     );
}

export default PageError;