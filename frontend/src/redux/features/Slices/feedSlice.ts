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
        updatePost: (state,action:PayloadAction<FeedPost>)=>{
            if (!state.posts) return

            const updatePostIndex = state.posts.findIndex((post) => post.post_id === action.payload.post_id);

            if (updatePostIndex === -1) return

            state.posts = [...state.posts.slice(0,updatePostIndex),
                            action.payload,
                            ...state.posts.slice(updatePostIndex + 1, state.posts.length)
                        ]
        },

        reset: ()=>initialState
    }
})

export const { reducer: feedReducer, actions: feedActions } = feedSlice;