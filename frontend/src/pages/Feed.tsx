import { Box, List, ListItem, Stack } from "@mui/material";
import Post from "../components/Post";
import { DEMO_DATA } from "../demoData";
import { maxHeight } from "@mui/system";


function Feed() {
    return ( 
        <>
            <List sx={
                    {maxHeight:'83vh',
                     overflowY:'scroll',
                     padding:0,
                     '::-webkit-scrollbar': {
                        width: '0'
                      }
                    }}>
                {DEMO_DATA.map((postData, index)=>{
                            return (
                                <ListItem key={index} sx={{padding:0}}>
                                    <Post {...postData}/>
                                </ListItem>
                            )
                        })}
            </List>
        </>

        );
}

export default Feed;