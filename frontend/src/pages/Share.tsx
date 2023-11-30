import { Button, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";

function Share() {
    return ( 
        <Stack spacing={4} sx={{marginTop:4}}>
            <Typography variant="h4">Let's Post Something!</Typography>
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