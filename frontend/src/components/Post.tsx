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


function Post(props? :PostProps) {
    const [isLiked,setIsLiked] = useState(false)


    return (
        <Box sx={{ width:'100vw', bgcolor:'red'}}>
            
            <Box sx={{ 
                display:'flex',
                justifyContent:'space-between',
                padding:1}}>
                
                <Stack spacing={1} direction='row' alignItems='center'>
                    
                    <Box   
                        component='div'
                        sx={{
                            width:'40px',
                            height:'40px',
                            bgcolor:'blue',
                            borderRadius:'100%'
                            }}>
                            img
                    </Box>
                    
                    <Typography>Fname Lname</Typography>
                    
                </Stack>

                <Typography sx={{alignSelf:'center'}}>Date</Typography>
            </Box>

            <Box   
                component='div'
                sx={{
                    height:'40vh',
                    bgcolor:'green',
                    }}>
                    img
            </Box>
            
            <Stack alignItems='flex-start'>
                <Typography align="left" sx={{margin:1}}>ihaodnimfo klanusf sfsofiefe fieosfj sefieof fiosfs fefpseifoef sfespifosjf fpeifousfkjf efeiajkfefe0wio fowfiwufjewf</Typography>
                
                <Stack direction='row' alignItems='center'>
                    <IconButton onClick={()=>setIsLiked(!isLiked)}>{isLiked ? <FavoriteIcon/>:<FavoriteBorderIcon/>}</IconButton>
                    <Typography>100 Likes</Typography>
                </Stack>
            </Stack>
            
        </Box>
        );
}

export default Post;