import { Box, Button, CircularProgress, List, ListItem, Stack, Typography } from "@mui/material";
import Post from "../components/Post";
import { useLazyGetPostsQuery } from "../redux/features/Api/posts/postsApiSlice";
import { useEffect, useRef, useState } from "react";
import useLocalStorage from "../Hooks/useLocalStorage";
import { User } from "../redux/features/Api/users/types/User";
import { FeedPost } from "../redux/features/Api/posts/types/FeedPost";
import PageError from "../components/PageError";
import { LoadingButton } from "@mui/lab";
import RefreshPageIcon from "../components/RefreshPageIcon";
import { ButtonsText } from "../consts/enums/ButtonsText";
import { Messages } from "../consts/enums/Messages";
import NoPosts from "../components/NoPosts";



const initialPages = 0;

function Feed() {

    const [user] = useLocalStorage<User>('user');


    const [trigger,{isLoading,isError}] = useLazyGetPostsQuery();
    
    const [posts,setPosts] = useState<FeedPost[] | null>(null);
    const [page,setPage] = useState(initialPages);
    const [isMorePages,setIsMorePages] = useState(true);


    const setNewPosts = (newPosts: FeedPost[],hasNext:boolean)=>{
        setPosts(newPosts)
        setPage(page + 1)
        setIsMorePages(hasNext)
    }

    const loadData = async () => {
        if (!posts) return

        const {data} = await trigger({userId:user.id,page:page});

        data && setNewPosts([...posts, ...data.posts],data.hasNext);
    }

    useEffect(()=>{
        const loadInitialData = async () =>{
            const {data} = await trigger({userId:user.id,page:page});

            data && setNewPosts(data.posts,data.hasNext)
        }
        loadInitialData();
    },[]);

    return ( 
        <Stack>
            {
                isError ?
                    <PageError/>
                :
                posts ? 
                posts.length === 0 ? <NoPosts/> :
                        <>
                            <List sx={ {  overflowY:'hidden'  }}>
                                { posts.map((postData, index)=>{
                                            return (
                                                <ListItem key={index} sx={{padding:0}}>
                                                    <Post post={postData}/>
                                                </ListItem>
                                            )
                                        })

                                }
                            </List>                    
                                
                            {isMorePages ? 
                                <LoadingButton 
                                    sx={{
                                        alignSelf:'center',
                                        marginBottom:4
                                    }}
                                    variant="contained" 
                                    onClick={loadData}
                                    loading={isLoading}
                                    >{ButtonsText.LoadMorePosts}
                                </LoadingButton>
                                        : 
                                <Stack>
                                    <Typography variant="h5">
                                        {Messages.SeenAllPosts}
                                    </Typography>
                                    <RefreshPageIcon sx={{marginBottom:4, alignSelf:'center'}}/>
                                </Stack>
                                    }
                        </>
                    :
                    isLoading && <CircularProgress size={70} sx={{gridColumn:2,padding:4}}/>

            }
        </Stack>

        );
}

export default Feed;