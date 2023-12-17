import { IconButton, Stack, Typography } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';


function PageError() {
    return ( 
        <Stack>
            <Typography sx={{paddingTop:4}}>
                Something goes wrong...
            </Typography>
            <Typography variant="h5" sx={{paddingBottom:2}}>
                Left's refresh the page!
            </Typography>
            <IconButton sx={{alignSelf:'center'}}
                onClick={()=>window.location.reload()}
                >
                <RefreshIcon/>
            </IconButton>
        </Stack>
     );
}

export default PageError;