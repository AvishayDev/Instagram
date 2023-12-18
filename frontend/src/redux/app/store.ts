import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from '../features/Api/apiSlice';
import { profileActions, profileReducer } from '../features/Slices/profileSlice';
import { feedActions, feedReducer } from '../features/Slices/feedSlice';

const store = configureStore({
    reducer: {
        profile:profileReducer,
        feed:feedReducer,
        [apiSlice.reducerPath]:apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),


});


export const resetStore = (dispatch: DispatchType)=>{
    dispatch(profileActions.reset())
    dispatch(feedActions.reset())
}


export default store;
export type StateType = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;