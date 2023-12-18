import { Box, BoxProps, IconButton } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';



function RefreshPageIcon(props: BoxProps) {
    return ( 
        <Box {...props}>
            <IconButton 
                    onClick={()=>window.location.reload()}
                    >
                <RefreshIcon/>
            </IconButton>
        </Box>
     );
}

export default RefreshPageIcon;