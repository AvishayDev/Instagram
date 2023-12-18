import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { ProfilePost } from "../Api/users/types/ProfilePosts"


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
        
        reset: ()=>initialState
    }
})

export const { reducer: profileReducer, actions: profileActions } = profileSlice;