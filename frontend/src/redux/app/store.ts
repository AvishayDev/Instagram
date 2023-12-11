import { configureStore } from '@reduxjs/toolkit'
import { loginReducer } from '../features/Slices/loginSlice';
import { apiSlice } from '../features/Api/apiSlice';

const store = configureStore({
    reducer: {
        login: loginReducer,
        [apiSlice.reducerPath]:apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),


});



export default store;
export type StateType = ReturnType<typeof store.getState>;