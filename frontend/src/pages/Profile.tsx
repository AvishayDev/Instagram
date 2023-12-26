import { Box, Stack, Typography, ImageList, ImageListItem, ImageListItemBar, IconButton, Button } from "@mui/material";
import useLocalStorage from "../Hooks/useLocalStorage";
import { User } from "../redux/features/Api/users/types/User";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IMAGES } from "../consts/Images";
import { useEffect } from "react";
import {  useLazyGetUserPostsQuery } from "../redux/features/Api/users/usersApiSlice";
import { useStoreDispatch } from "../Hooks/storeHooks";
import CircularProgress from '@mui/material/CircularProgress';
import PageError from "../components/PageError";
import { ButtonsText } from "../consts/enums/ButtonsText";
import { Titles } from "../consts/enums/Titles";
import { Colors } from "../consts/enums/Colors";
import UserNotHasPosts from "../components/UserNotHasPosts";



interface ProfileProps{
    onLogout:()=>void
}

function Profile(props:ProfileProps) {

    const [user] = useLocalStorage<User>('user');

    const [trigger,{isLoading, isError, data:userPosts}] = useLazyGetUserPostsQuery();
    


    useEffect(()=>{
        const loadData = async ()=> {user && await trigger(user.id)};
        loadData();
    },[])

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
                                src={user.profileImageUrl || IMAGES.defaultUserProfileImage }
                                />
                        
                        <Button 
                            variant="contained"
                            onClick={props.onLogout}
                            >
                            {ButtonsText.LOGOUT}
                        </Button>
                    </Stack>
                    
                    <Stack alignItems='flex-start'>
                        <Typography>{user.firstName} {user.lastName}</Typography>
                        <Typography>{user.username}</Typography>
                    </Stack >
                    
                    <Stack alignItems='flex-start'>
                        <Typography>{Titles.BIO}</Typography>
                        <Typography variant="body2" align="left" sx={{width:'50vw'}}>{user.bio}</Typography>
                    </Stack>
                </Stack>
                

                <Box sx={{ borderTop:'#d3d3d3 solid 1px', }}>
                    {
                    isError ? 
                        <PageError/>
                    : 
                        userPosts ? 
                        (userPosts.length === 0 ? <UserNotHasPosts/> :
                        <ImageList sx={{
                                overflow:'hidden',
                                justifyItems:'center',
                                }} cols={3} rowHeight={160} >
                                    {
                                        userPosts.map(({image_url,likes}, index)=> (
                                            <ImageListItem key={index}>
                                                <img src={!image_url ? IMAGES.defaultPostImage : image_url} loading="lazy"/>
                                                <ImageListItemBar subtitle={likes} actionIcon={<FavoriteIcon sx={{color:Colors.RED}}/>} sx={{height:30}}/>
                                            </ImageListItem>
                                        ))
                                    }
                        </ImageList>)
                        :
                        isLoading && <CircularProgress size={70} sx={{gridColumn:2,padding:4}}/>

                    
                    }
                </Box>
        </Stack>
        
        );
}

export default Profile;