import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { ProfilePosts } from "../Api/users/types/profilePosts"


interface InitialState {
    userPosts:ProfilePosts[]
}



const initialState: InitialState = {
    userPosts:[]
}


const profileSlice = createSlice({
    name:'profile',
    initialState,
    reducers:{
        setUserPosts: (state, action: PayloadAction<ProfilePosts[]>)=>{
            state.userPosts = action.payload;
        }
    }
})

export const { reducer: profileReducer, actions: profileActions } = profileSlice;