import { Box, Stack, Typography,IconButton } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useEffect, useState } from "react";

interface PostProps {
    userProfileImageUrl:string
    userFirstName:string
    userLastName:string
    uploadDate:Date
    ImageUrl:string
    text:string
    isLiked:boolean
    numOfLikes:number
}


function Post(props :PostProps) {
    const [isLiked,setIsLiked] = useState(props.isLiked)


    return (
        <Box sx={{ width:'100vw', bgcolor:'red'}}>
            
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
                            bgcolor:'blue',
                            borderRadius:'100%'
                            }}
                        src={props.userProfileImageUrl}
                        >
                            
                    </Box>
                    
                    <Typography>{props.userFirstName} {props.userLastName}</Typography>
                    
                </Stack>

                <Typography sx={{alignSelf:'center'}}>{props.uploadDate.getFullYear()}</Typography>
            </Box>

            <Box   
                component='img'
                sx={{
                    height:'40vh',
                    bgcolor:'green',
                    width:'100%'
                    }}
                src={props.ImageUrl}
                >
                    
            </Box>
            
            <Stack alignItems='flex-start'>
                <Typography align="left" sx={{margin:1}}>{props.text}</Typography>
                
                <Stack direction='row' alignItems='center'>
                    <IconButton onClick={()=>setIsLiked(!isLiked)}>{isLiked ? <FavoriteIcon/>:<FavoriteBorderIcon/>}</IconButton>
                    <Typography>100 Likes</Typography>
                </Stack>
            </Stack>
            
        </Box>
        );
}

export default Post;