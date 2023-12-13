import { configureStore } from '@reduxjs/toolkit'
import { loginReducer } from '../features/Slices/loginSlice';
import { apiSlice } from '../features/Api/apiSlice';
import { registerReducer } from '../features/Slices/registerSlice';
import { profileReducer } from '../features/Slices/profileSlice';

const store = configureStore({
    reducer: {
        login: loginReducer,
        register:registerReducer,
        profile:profileReducer,
        [apiSlice.reducerPath]:apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),


});



export default store;
export type StateType = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;