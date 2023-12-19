import { Box, Stack, Typography, ImageList, ImageListItem, Button, ImageListItemBar, IconButton } from "@mui/material";
import { DEMO_PROFILE_IMAGES } from "../consts/demoData";
import useLocalStorage from "../Hooks/useLocalStorage";
import LinkButton from "../components/LinkButton";
import { User } from "../redux/features/Api/users/types/User";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IMAGES } from "../consts/Images";
import { useEffect, useState } from "react";
import { useLazyGetUserPostsQuery } from "../redux/features/Api/users/usersApiSlice";
import { useStoreDispatch, useStoreSelector } from "../Hooks/storeHooks";
import { profileActions } from "../redux/features/Slices/profileSlice";
import CircularProgress from '@mui/material/CircularProgress';
import RefreshIcon from '@mui/icons-material/Refresh';
import PageError from "../components/PageError";
import { resetStore } from "../redux/app/store";

function Profile() {

    const [user, setUser] = useLocalStorage<User>('user');

    const [trigger,{isLoading, isError}] = useLazyGetUserPostsQuery();
    const dispatch = useStoreDispatch();
    const {userPosts} = useStoreSelector(state=>state.profile);

    useEffect(()=>{
        const loadData = async () =>{
            const {data} = await trigger(user.id);

            data && dispatch(profileActions.setUserPosts(data));

        }
        !userPosts && loadData();
    },[]);

    const handleLogout = ()=>{
        setUser(null)
        resetStore(dispatch)
    }

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
                                src={!user.profileImageUrl ? IMAGES.defaultUserProfileImage : user.profileImageUrl}
                                />
                        
                        <LinkButton 
                            to="/login"
                            variant="contained"
                            onClick={handleLogout}
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
                

                <Box sx={{ borderTop:'#d3d3d3 solid 1px', }}>
                    {
                    isError ? 
                        <PageError/>
                    : 
                        <ImageList sx={{
                                overflow:'hidden',
                                justifyItems:'center',
                                }} cols={3} rowHeight={160} >
                                    {
                                        userPosts ? userPosts.map(({image_url,likes}, index)=> (
                                            <ImageListItem key={index}>
                                                <img src={!image_url ? IMAGES.defaultPostImage : image_url} loading="lazy"/>
                                                <ImageListItemBar subtitle={likes} actionIcon={<FavoriteIcon color="error"/>} sx={{height:30}}/>
                                            </ImageListItem>
                                        ))
                                        :
                                        isLoading && <CircularProgress size={70} sx={{gridColumn:2,padding:4}}/>
                                    }
                        </ImageList>
                    }
                </Box>
        </Stack>
        
        );
}

export default Profile;