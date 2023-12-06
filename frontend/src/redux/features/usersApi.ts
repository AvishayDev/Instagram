import { User } from "../app/types/User";
import { apiSlice } from "./apiSlice";





export const usersApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getAllUsers:builder.query<User[],void>({
            query: () =>  ({ url:'users', method: 'GET'})
        }), //mutation for the rest of Rest Api calls
        
    })
})

export const {useGetAllUsersQuery} = usersApi;