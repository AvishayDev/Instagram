import { Box, Stack, Typography } from "@mui/material";

function Profile() {
    return ( 

        <Stack spacing={6} width='100vw'>
                <Stack spacing={4} alignItems='flex-start' margin={2}>
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

                
        </Stack>
        
        );
}

export default Profile;