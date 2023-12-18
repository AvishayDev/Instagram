import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { FeedPost } from "../Api/posts/types/FeedPost"


interface InitialState {
    posts:FeedPost[] | null
}



const initialState: InitialState = {
    posts: null
}


const feedSlice = createSlice({
    name:'feed',
    initialState,
    reducers:{
        setPosts: (state, action: PayloadAction<FeedPost[]>)=>{
            state.posts = action.payload;
        },
        addPosts:(state, action: PayloadAction<FeedPost[]>)=>{
            state.posts && (state.posts = state.posts.concat(action.payload));
        },
        
        reset: ()=>initialState
    }
})

export const { reducer: feedReducer, actions: feedActions } = feedSlice;