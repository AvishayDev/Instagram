import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { ProfilePost } from "../../../types/ProfilePost"


interface InitialState {
    userPosts:ProfilePost[] | null
}



const initialState: InitialState = {
    userPosts: null
}


const profileSlice = createSlice({
    name:'profile',
    initialState,
    reducers:{
        setUserPosts: (state, action: PayloadAction<ProfilePost[]>)=>{
            state.userPosts = action.payload;
        },
        addPost: (state,action: PayloadAction<ProfilePost>)=>{
            state.userPosts?.unshift(action.payload)
        },
        
        reset: ()=>initialState
    }
})

export const { reducer: profileReducer, actions: profileActions } = profileSlice;