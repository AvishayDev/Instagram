import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { DataError } from "../../../types/DataError"



type InitialState = {
    username:string
    password:string
    rePassword:string
    profileImageUrl:string
    firstname:string
    lastName:string
    bio:string
}


const initialState:InitialState = {
    username:'',
    password:'',
    rePassword:'',
    profileImageUrl:'',
    firstname:'',
    lastName:'',
    bio:'',
}


const registerSlice = createSlice({
    name:'register',
    initialState,
    reducers:{

        // setUsername: (state, action: PayloadAction<string>) => {
        //     state.username.data = action.payload;
        // },
        // setUsernameError: (state, action: PayloadAction<string>) => {
        //     state.username.isError = true;
        //     state.username.error = action.payload;
        // },
        // resetUsernameError: (state, action: PayloadAction<string>) => {
        //     state.username.isError = false;
        //     state.username.error = '';
        // },


        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
        setRePassword: (state, action: PayloadAction<string>) => {
            state.rePassword = action.payload;
        },
        
    }
});


export const { reducer: registerReducer, actions: registerActions } = registerSlice;