import { IconButton, Stack, Typography } from "@mui/material";
import { Titles } from "../consts/enums/Titles";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Paths } from "../consts/enums/Paths";


function NoPosts() {

    const navigate = useNavigate();

    return ( 
        <Stack>
            <Typography variant="h4">{Titles.NoPosts1}</Typography>
            <Typography variant="h5">{Titles.NoPost2}</Typography>
            
            <IconButton onClick={()=>navigate(Paths.SHARE)}>
                <ArrowForwardIosIcon/>
            </IconButton>
        
        </Stack>

     );
}

export default NoPosts;