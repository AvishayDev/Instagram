import { Box, Stack, Typography, ImageList, ImageListItem } from "@mui/material";
import { DEMO_PROFILE_IMAGES } from "../demoData";


function Profile() {
    return ( 

        <Stack width='100vw'>
                <Stack spacing={4} alignItems='flex-start' padding={2}>
                    <Box   
                            component='div'
                            sx={{
                                width:'100px',
                                height:'100px',
                                bgcolor:'blue',
                                borderRadius:'100%'
                            }}/>
                    
                    <Stack alignItems='flex-start'>
                        <Typography>Fname Lname</Typography>
                        <Typography>Username</Typography>
                    </Stack >
                    
                    <Stack alignItems='flex-start'>
                        <Typography>Bio</Typography>
                        <Typography variant="body2" align="left" sx={{width:'50vw'}}>woenfnf oewfmoi wedwdwd wdwd</Typography>
                    </Stack>
                </Stack>
                
                <ImageList sx={{
                        borderTop:'#d3d3d3 solid 1px',
                        }} cols={3} rowHeight={160} >
                            {
                                DEMO_PROFILE_IMAGES.map((imageData, index)=> (
                                    <ImageListItem key={index}>
                                        <img src={imageData} loading="lazy"/>
                                    </ImageListItem>
                                ))
                            }
                </ImageList>
        </Stack>
        
        );
}

export default Profile;