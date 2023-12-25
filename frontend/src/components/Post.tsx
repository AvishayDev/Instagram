import { Box, Stack, Typography,IconButton } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from "react";
import { IMAGES } from "../consts/Images";
import { FeedPost } from "../redux/features/Api/posts/types/FeedPost";
import {formatDistanceToNow} from 'date-fns'
import { useLazySignLikeQuery,useLazyUnsignLikeQuery } from "../redux/features/Api/likes/likesApiSlice";
import useLocalStorage from "../Hooks/useLocalStorage";
import { User } from "../redux/features/Api/users/types/User";
import { SignLikeType } from "../redux/features/Api/likes/types/signAndUnsign";
import AutoClosePopup from "./AutoClosePopup";
import PostImage from "./PostImages";
import { Messages } from "../consts/enums/Messages";
import { Colors } from "../consts/enums/Colors";

interface PostProps {
    post:FeedPost,
}

function Post(props :PostProps) {

    const [user] = useLocalStorage<User>('user');

    const {post} = props;

    const [isLiked,setIsLiked] = useState(post.is_liked)
    const [numOfLikes,setnumOfLikes] = useState(post.likes)
    const [wasError,setWasError] = useState(false)


    const signLike:SignLikeType = {userId:user.id, postId:post.post_id}

    const [signTrigger] = useLazySignLikeQuery();
    const [unsignTrigger] = useLazyUnsignLikeQuery();


    const handleSignLike = async () => {
        

        setnumOfLikes(isLiked ? numOfLikes - 1 : numOfLikes + 1);
        setIsLiked(!isLiked)

        if (!wasError){
            const {isError} = isLiked ? await unsignTrigger(signLike) : await signTrigger(signLike);
            setWasError(isError);
        } else {
            setWasError(false)
        }
    }


    return (
        <Stack width='100vw' borderTop='#d3d3d3 solid 1px'>
            
            <AutoClosePopup 
                    message={Messages.ServerError}
                    open={wasError}
                    onClose={()=>setWasError(false)}
                    color={Colors.ERROR}
                    />
            
            <Box sx={{ 
                display:'flex',
                justifyContent:'space-between',
                padding:1}}>
                
                <Stack spacing={1} direction='row' alignItems='center'>
                    
                    <Box   
                        component='img'
                        sx={{
                            width:'40px',
                            height:'40px',
                            borderRadius:'100%'
                            }}
                        src={post.user_profile_image_url || IMAGES.defaultUserProfileImage}
                        loading="lazy"
                        >
                            
                    </Box>
                    
                    <Typography>{post.user_firstname} {post.user_lastname}</Typography>
                    
                </Stack>

                <Typography sx={{alignSelf:'center'}}>{formatDistanceToNow(new Date(post.upload_date),{addSuffix:true})}</Typography>
            </Box>
            
            <Box sx={{alignSelf:'center'}}>
                <PostImage
                        imageUrl={post.image_url}
                        onLike={handleSignLike}
                        isLiked={isLiked}
                />
            </Box>
        
            
            <Stack alignItems='flex-start'>
                <Typography align="left" sx={{margin:1}}>{post.text}</Typography>
                
                <Stack direction='row' alignItems='center'>
                    <IconButton onClick={handleSignLike}>{isLiked ? <FavoriteIcon sx={{color:Colors.RED}}/>:<FavoriteBorderIcon/>}</IconButton>
                    <Typography>{numOfLikes} Likes</Typography>
                </Stack>
            </Stack>
            
        </Stack>
        );
}

export default Post;