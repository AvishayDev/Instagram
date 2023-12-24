import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({baseUrl:process.env.REACT_APP_SERVER_URL});


export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery,
    endpoints:()=>({})
});


