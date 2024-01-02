import {BaseQueryApi, FetchArgs, createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { StateType } from '../../app/store';
import { authSliceActions } from '../Auth/authSlice';
import { Tokens } from '../Auth/types/Tokens';

const baseQuery = fetchBaseQuery({
    baseUrl:process.env.REACT_APP_SERVER_URL,
    credentials: 'include',
    prepareHeaders: (headers,api) => {
        const state = api.getState() as StateType;

        const access_token = state.auth.tokens?.access_token;

        if (access_token && !headers.get('Authorization'))
            headers.set('Authorization',`Bearer ${access_token}`)
        

        return headers;
    }

});


const baseQueryWithReAuth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {

    let result = await baseQuery(args,api,extraOptions);
    if (result?.error?.status !== 403) return result;
    
    const state = api.getState() as StateType;

    console.log('sending refresh token')
    const refreshToken = state.auth.tokens?.refresh_token;

    const refreshOptions = {
        url:'auth/refresh',
        method:'POST',
        headers:{
            Authorization:`Bearer ${refreshToken}`
        },
    };
    const refreshResult = await baseQuery(refreshOptions, api, extraOptions);

    if (refreshResult?.data){

        api.dispatch(authSliceActions.setCredentials(refreshResult.data as Tokens))
        result = await baseQuery(args, api, extraOptions)
    } else {
        api.dispatch(authSliceActions.logout())
    }
        

    return result;
}


export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery:baseQueryWithReAuth,
    endpoints:()=>({})
});


