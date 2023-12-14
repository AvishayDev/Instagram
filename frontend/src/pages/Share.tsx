import { Box, Button, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { IMAGES } from "../consts/Images";

function Share() {
    return ( 
        <Stack spacing={4} marginTop={3}>
            <Typography variant="h4">Let's Post Something!</Typography>
                <Box   
                    component='img'
                    sx={{
                        width:'200px',
                        height:'200px',
                        boxShadow:2,
                        alignSelf:'center'
                        
                    }}
                    src={IMAGES.defaultPostImage}
                    />
            <TextField
                label='Image Url'/>
            
            <TextField
                label='Write Something...'/>
            <Button variant="contained">
                Publish!
            </Button>
        </Stack>
        );
}

export default Share;