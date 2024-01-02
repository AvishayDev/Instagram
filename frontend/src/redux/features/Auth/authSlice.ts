import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User } from '../Api/users/types/User'
import { Tokens } from './types/Tokens'
import storage from 'redux-persist/lib/storage'
import persistReducer from 'redux-persist/es/persistReducer'

export type AuthStateType = {
  tokens: Tokens 
  hasTokens:boolean
}

const initialState:AuthStateType = {
    tokens: {
      access_token:'',
      refresh_token:''
    },
    hasTokens:false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<Tokens>) => {
      state.tokens = action.payload;
      state.hasTokens=true;
    },
    logout: () => initialState,

  },
})



export const {actions:authSliceActions, reducer:authSliceReducer} = authSlice;

