import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from '../features/Api/apiSlice';

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]:apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),


});


export const resetStore = (dispatch: DispatchType)=>{
}


export default store;
export type StateType = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;