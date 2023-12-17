import { Box, Stack, Typography,IconButton } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useEffect, useState } from "react";
import { IMAGES } from "../consts/Images";
import { FeedPost } from "../redux/features/Api/posts/types/FeedPost";




function Post(props :FeedPost) {
    const [isLiked,setIsLiked] = useState(props.is_liked)

    return (
        <Box sx={{ width:'100vw', borderTop:'#d3d3d3 solid 1px'}}>
            
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
                        src={props.user_profile_image_url ? IMAGES.defaultUserProfileImage : props.user_profile_image_url}
                        >
                            
                    </Box>
                    
                    <Typography>{props.user_firstname} {props.user_lastname}</Typography>
                    
                </Stack>

                <Typography sx={{alignSelf:'center'}}>{new Date(props.upload_date).getFullYear()}</Typography>
            </Box>

            <Box   
                component='img'
                sx={{
                    height:'40vh',
                    width:'100%'
                    }}
                src={props?.image_url}
                loading="lazy"
                >
                    
            </Box>
            
            <Stack alignItems='flex-start'>
                <Typography align="left" sx={{margin:1}}>{props?.text}</Typography>
                
                <Stack direction='row' alignItems='center'>
                    <IconButton onClick={()=>setIsLiked(!isLiked)}>{isLiked ? <FavoriteIcon/>:<FavoriteBorderIcon/>}</IconButton>
                    <Typography>{props?.likes} Likes</Typography>
                </Stack>
            </Stack>
            
        </Box>
        );
}

export default Post;