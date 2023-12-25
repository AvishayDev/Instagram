import { IconButton, Stack, Typography } from "@mui/material";
import { Titles } from "../consts/enums/Titles";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from "react-router-dom";
import { Paths } from "../consts/enums/Paths";

function UserNotHasPosts() {

    const navigate = useNavigate()


    return ( 
        <Stack spacing={4} marginTop={4} alignItems='center'>
            <Typography variant="h5">
                {Titles.UserNotHasPosts1}
            </Typography>
            <Typography variant="h5">
                {Titles.UserNotHasPosts2}
            </Typography>
            <IconButton onClick={()=>navigate(Paths.SHARE)} sx={{alignSelf:'center'}}>
                <ArrowBackIosNewIcon/>
            </IconButton>
        </Stack>
     );
}

export default UserNotHasPosts;