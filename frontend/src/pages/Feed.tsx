import { Box, Button, CircularProgress, List, ListItem, Stack, Typography } from "@mui/material";
import Post from "../components/Post";
import { DEMO_DATA } from "../consts/demoData";
import { maxHeight } from "@mui/system";
import { useLazyGetPostsQuery } from "../redux/features/Api/posts/postsApiSlice";
import { useStoreDispatch, useStoreSelector } from "../Hooks/storeHooks";
import { useEffect, useRef, useState } from "react";
import useLocalStorage from "../Hooks/useLocalStorage";
import { User } from "../redux/features/Api/users/types/User";
import { feedActions } from "../redux/features/Slices/feedSlice";
import { FeedPost } from "../redux/features/Api/posts/types/FeedPost";
import PageError from "../components/PageError";
import { LoadingButton } from "@mui/lab";
import RefreshPageIcon from "../components/RefreshPageIcon";


function Feed() {

    const [user] = useLocalStorage<User>('user');


    const [trigger,{isLoading,isError}] = useLazyGetPostsQuery();
    const dispatch = useStoreDispatch();
    const {posts, page, isMorePages} = useStoreSelector(state=>state.feed);

    const loadData = async () =>{
        const {data} = await trigger({userId:user.id,page:page});

        data && dispatch(feedActions.addPosts(data));
    }

    useEffect(()=>{
        const loadInitialData = async () =>{
            const {data} = await trigger({userId:user.id,page:0});
    
            data && dispatch(feedActions.setPosts(data));
        }
        loadInitialData();
    },[]);

    const handleLike = (post:FeedPost)=> dispatch(feedActions.updatePost(post))
    


    return ( 
        <Stack>
            {
                isError ?
                    <PageError/>
                :
                <>
                    <List sx={ {  overflowY:'hidden'  }}>
                        { posts ? posts.map((postData, index)=>{
                                    return (
                                        <ListItem key={index} sx={{padding:0}}>
                                            <Post post={postData} onLike={handleLike}/>
                                        </ListItem>
                                    )
                                })
                                :
                                isLoading && <CircularProgress size={70} sx={{gridColumn:2,padding:4}}/>

                           }
                    </List>
                    {   
                        isMorePages ? <LoadingButton 
                                            sx={{
                                                alignSelf:'center',
                                                marginBottom:4
                                            }}
                                            variant="contained" 
                                            onClick={loadData}
                                            loading={isLoading}
                                            >Load More Posts!
                                        </LoadingButton>
                                    : 
                                      <Stack>
                                          <Typography variant="h5">
                                              You've Seen All The Posts..
                                          </Typography>
                                          <RefreshPageIcon sx={{marginBottom:4, alignSelf:'center'}}/>
                                      </Stack>
                    }
                </>
            }
        </Stack>

        );
}

export default Feed;