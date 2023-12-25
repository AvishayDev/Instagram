import React, { useState } from 'react';
import { Box, Fade, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IMAGES } from '../consts/Images';
import { Colors } from '../consts/enums/Colors';


interface PostImageProps {
    imageUrl?:string,
    onLike?:()=>void,
    isLiked:boolean
}


const PostImage = (props:PostImageProps) => {
  const [showHeart, setShowHeart] = useState(false);


  const handleSignLike = () => {

    if (!props.isLiked){
      setShowHeart(true);
      setTimeout(() => {
        setShowHeart(false);
      }, 1000);
    }

    props.onLike?.()
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        component="img"
        sx={{
          height: '50vh',
          width: '50vh',
        }}
        src={props.imageUrl || IMAGES.defaultPostImage}
        loading="lazy"
        onDoubleClick={handleSignLike}
      />
      <Fade in={showHeart} timeout={500}>

          <FavoriteIcon sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: Colors.RED,
            background: 'transparent',
            width:'20%',
            height:'20%'
          }}/>
      </Fade>
    </Box>
  );
};

export default PostImage;
