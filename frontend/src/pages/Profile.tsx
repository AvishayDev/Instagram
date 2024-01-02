import { Box, Stack, Typography, ImageList, ImageListItem, ImageListItemBar, IconButton, Button } from "@mui/material";
import useLocalStorage from "../Hooks/useLocalStorage";
import { User } from "../redux/features/Api/users/types/User";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IMAGES } from "../consts/Images";
import { useEffect, useState } from "react";
import {  useLazyGetUserPostsQuery } from "../redux/features/Api/users/usersApiSlice";
import { useStoreDispatch, useStoreSelector } from "../Hooks/storeHooks";
import CircularProgress from '@mui/material/CircularProgress';
import PageError from "../components/PageError";
import { ButtonsText } from "../consts/enums/ButtonsText";
import { Titles } from "../consts/enums/Titles";
import { Colors } from "../consts/enums/Colors";
import UserNotHasPosts from "../components/UserNotHasPosts";
import { useLazyLogoutQuery } from "../redux/features/Auth/authApiSlice";
import { LoadingButton } from "@mui/lab";
import AutoClosePopup from "../components/AutoClosePopup";
import { Messages } from "../consts/enums/Messages";
import { authSliceActions } from "../redux/features/Auth/authSlice";
import { JwtPayload } from "../types/jwtPayload";
import { useJwt } from "react-jwt";


function Profile() {

    const [trigger,{isLoading, isError, data:userPosts}] = useLazyGetUserPostsQuery();
    const [logoutTrigger,{isLoading:isLogoutLoading, isError:isLogoutError}] = useLazyLogoutQuery();
    
    const [openLogoutError,setOpenLogoutError] = useState(isLogoutError)
    useEffect(()=>setOpenLogoutError(isLogoutError),[isLogoutError])

    const dispatch = useStoreDispatch();
    const {access_token} = useStoreSelector(state => state.auth.tokens)
    
    const { decodedToken } = useJwt<JwtPayload>(access_token);

    const user = decodedToken?.userData;
    
    
    useEffect(()=>{
        const loadData = async ()=> await trigger();
        loadData();
    },[])
    
    
    const handleLogout = async () => {
        
        const {isSuccess} = await logoutTrigger();
        
        isSuccess && dispatch(authSliceActions.logout())
    }
    
    return ( 

        <Stack width='100vw'>

            {
                isLogoutError && <AutoClosePopup 
                                    color="error" 
                                    message={Messages.ServerError}
                                    open={openLogoutError}
                                    onClose={()=>setOpenLogoutError(false)}
                                    />
            }

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
                                src={user?.profileImageUrl || IMAGES.defaultUserProfileImage }
                                />
                        
                        <LoadingButton 
                            variant="contained"
                            onClick={handleLogout}
                            loading={isLogoutLoading}
                            >
                            {ButtonsText.LOGOUT}
                        </LoadingButton>
                    </Stack>
                    
                    <Stack alignItems='flex-start'>
                        <Typography>{user?.firstName} {user?.lastName}</Typography>
                        <Typography>{user?.username}</Typography>
                    </Stack >
                    
                    <Stack alignItems='flex-start'>
                        <Typography>{Titles.BIO}</Typography>
                        <Typography variant="body2" align="left" sx={{width:'50vw'}}>{user?.bio}</Typography>
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