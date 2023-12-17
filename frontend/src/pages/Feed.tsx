import { Box, CircularProgress, List, ListItem } from "@mui/material";
import Post from "../components/Post";
import { DEMO_DATA } from "../consts/demoData";
import { maxHeight } from "@mui/system";
import { useLazyGetPostsQuery } from "../redux/features/Api/posts/postsApiSlice";
import { useStoreDispatch, useStoreSelector } from "../Hooks/storeHooks";
import { useEffect, useState } from "react";
import useLocalStorage from "../Hooks/useLocalStorage";
import { User } from "../redux/features/Api/users/types/User";
import { feedActions } from "../redux/features/Slices/feedSlice";
import { FeedPost } from "../redux/features/Api/posts/types/FeedPost";
import PageError from "../components/PageError";


function Feed() {

    const [user, setUser] = useLocalStorage<User>('user');


    const [trigger,{isLoading,isError}] = useLazyGetPostsQuery();
    const dispatch = useStoreDispatch();
    const {posts} = useStoreSelector(state=>state.feed);

    useEffect(()=>{
        const loadData = async () =>{
            if (!posts){
                const {data} = await trigger({userId:user.id,page:0});

                data && dispatch(feedActions.setPosts(data));
            }
        }
        loadData();
    },[]);

    return ( 
        <>
            {
                isError ?
                    <PageError/>
                :
                    <List sx={ {  overflowY:'hidden'  }}>
                        {posts ? posts.map((postData, index)=>{
                                    return (
                                        <ListItem key={index} sx={{padding:0}}>
                                            <Post {...postData}/>
                                        </ListItem>
                                    )
                                })
                                :
                                isLoading && <CircularProgress size={70} sx={{gridColumn:2,padding:4}}/>

                           }
                    </List>
            }
        </>

        );
}

export default Feed;