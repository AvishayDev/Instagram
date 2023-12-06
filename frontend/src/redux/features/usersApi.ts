import { apiSlice } from "./apiSlice";





export const usersApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getAllUsers:builder.query({
            query:()=>  {return {url:'users'}}
        }) //mutation for the rest of Rest Api calls
    })
})

export const {useGetAllUsersQuery} = usersApi;