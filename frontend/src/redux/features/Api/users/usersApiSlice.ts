import { LoginEP } from "../../Auth/types/LoginEP";
import { User } from "./types/User";
import { apiSlice } from "../apiSlice";
import { CheckUser } from "./types/CheckUser";
import { ProfilePost } from "../../../../types/ProfilePost";
import { RegisterUser } from "./types/RegisterUser";




export const usersApi = apiSlice.injectEndpoints({
    
    endpoints:(builder)=>({
        checkUsername:builder.query<CheckUser,string>({
            query: (username:string) => ({
                url:'users/check',
                method:'POST',
                body:{username}
            })
        }),
        getUserPosts: builder.query<ProfilePost[],void>({
            query: () => ({
                url:`users/posts`
            })
        }),
    })
})

export const {useLazyGetUserPostsQuery, useLazyCheckUsernameQuery} = usersApi;