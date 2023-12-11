import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { DataError } from "../../../types/DataError"


export interface LoginStateType {
    username: DataError<string>
    password: DataError<string>
  }


const initialState: LoginStateType = {
    username: {data: ''},
    password: {data: ''}
}


const loginSlice = createSlice({
    name:'login',
    initialState,
    reducers:{
        updateUsername: (state, action: PayloadAction<string>) =>{
            state.username.data = action.payload;

            
        },
        updatePassword: (state, action: PayloadAction<string>) =>{
            state.password.data = action.payload;
        },
        
        usernameError: (state, action: PayloadAction<string>) =>{
            state.username.isError = true;
            state.username.error = action.payload
        },
        passwordError: (state, action: PayloadAction<string>) =>{
            state.password.isError = true;
            state.password.error = action.payload
        },

        clearUsernameError: (state)=>{
            state.username.error = ''
            state.username.isError = false;
        },

        clearPasswordError: (state)=>{
            state.password.error = ''
            state.password.isError = false;
        }


    }
})

export const { reducer: loginReducer, actions: loginActions } = loginSlice;