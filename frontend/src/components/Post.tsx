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




function Post(props :FeedPost) {

    const [user] = useLocalStorage<User>('user');

    const [isLiked,setIsLiked] = useState(props.is_liked)
    const [numOfLikes,setnumOfLikes] = useState(props.likes)

    const signLike:SignLikeType = {userId:user.id, postId:props.post_id}

    const [signTrigger,{isError:isSignError}] = useLazySignLikeQuery();
    const [unsignTrigger,{isError:isUnsignError}] = useLazyUnsignLikeQuery();


    const handleSignLike = async () => {
        

        setnumOfLikes(isLiked ? numOfLikes - 1 : numOfLikes + 1);
        setIsLiked(!isLiked)


        if (isLiked){
            const {isError:isUnsignError} = await unsignTrigger(signLike);

            if (isUnsignError){
                setnumOfLikes((prevnumOfLikes)=>prevnumOfLikes + 1);
                setIsLiked(!isLiked)
            }
        } else {
            const {isError:isSignError} = await signTrigger(signLike);

            if (isSignError){
                setnumOfLikes((prevnumOfLikes)=>prevnumOfLikes - 1)
                setIsLiked(!isLiked)
            }
        }

    }

    return (
        <Stack width='100vw' borderTop='#d3d3d3 solid 1px'>
            
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
                        src={!props.user_profile_image_url ? IMAGES.defaultUserProfileImage : props.user_profile_image_url}
                        >
                            
                    </Box>
                    
                    <Typography>{props.user_firstname} {props.user_lastname}</Typography>
                    
                </Stack>

                <Typography sx={{alignSelf:'center'}}>{formatDistanceToNow(new Date(props.upload_date),{addSuffix:true})}</Typography>
            </Box>
            
            <Box   
                component='img'
                sx={{
                    height:'50vh',
                    width:'50vh',
                    alignSelf:'center'
                    }}
                src={props?.image_url}
                loading="lazy"
                >
                        
            </Box>
            
            <Stack alignItems='flex-start'>
                <Typography align="left" sx={{margin:1}}>{props?.text}</Typography>
                
                <Stack direction='row' alignItems='center'>
                    <IconButton onClick={handleSignLike}>{isLiked ? <FavoriteIcon/>:<FavoriteBorderIcon/>}</IconButton>
                    <Typography>{numOfLikes} Likes</Typography>
                </Stack>
            </Stack>
            
        </Stack>
        );
}

export default Post;