import { Box, Stack, Typography, ImageList, ImageListItem, Button, ImageListItemBar } from "@mui/material";
import { DEMO_PROFILE_IMAGES } from "../consts/demoData";
import useLocalStorage from "../Hooks/useLocalStorage";
import LinkButton from "../components/LinkButton";
import { User } from "../redux/features/Api/users/types/User";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IMAGES } from "../consts/Images";


function Profile() {

    const [user, setUser] = useLocalStorage<User>('user');

    return ( 

        <Stack width='100vw'>
                <Stack spacing={4} alignItems='flex-start' padding={2}>
                    <Stack direction='row' width='100%' alignItems='center' justifyContent='space-between'>
                        <Box   
                                component='img'
                                sx={{
                                    width:'100px',
                                    height:'100px',
                                    borderRadius:'100%',
                                    boxShadow:3
                                }}
                                src={user.profileImageUrl === null ? IMAGES.defaultUserProfileImage : user.profileImageUrl}
                                />
                        
                        <LinkButton 
                            to="/login"
                            variant="contained"
                            onClick={()=>setUser(null)}
                            >
                            Logout
                        </LinkButton>
                    </Stack>
                    
                    <Stack alignItems='flex-start'>
                        <Typography>{user?.firstName} {user?.lastName}</Typography>
                        <Typography>{user?.username}</Typography>
                    </Stack >
                    
                    <Stack alignItems='flex-start'>
                        <Typography>Bio</Typography>
                        <Typography variant="body2" align="left" sx={{width:'50vw'}}>{user?.bio}</Typography>
                    </Stack>
                </Stack>
                
                <ImageList sx={{
                        borderTop:'#d3d3d3 solid 1px',
                        overflow:'hidden'
                        }} cols={3} rowHeight={160} >
                            {
                                DEMO_PROFILE_IMAGES.map((imageUrl, index)=> (
                                    <ImageListItem key={index}>
                                        <img src={imageUrl === null ? IMAGES.defaultPostImage : imageUrl} loading="lazy"/>
                                        <ImageListItemBar subtitle='123' actionIcon={<FavoriteIcon color="error"/>} sx={{height:30}}/>
                                    </ImageListItem>
                                ))
                            }
                </ImageList>
        </Stack>
        
        );
}

export default Profile;