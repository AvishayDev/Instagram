import { LoginEP } from "./types/LoginEP";
import { User } from "./types/User";
import { apiSlice } from "../apiSlice";
import { CheckUser } from "./types/CheckUser";
import { ProfilePost } from "../../../../types/ProfilePost";
import { RegisterUser } from "./types/RegisterUser";




export const usersApi = apiSlice.injectEndpoints({
    
    endpoints:(builder)=>({
        getAllUsers:builder.query<User[],void>({
            query: () =>  ({ 
                url:'users', 
                method: 'GET'
            })
        }), 
        checkUsername:builder.query<CheckUser,string>({
            query: (username:string) => ({
                url:'users/check',
                method:'POST',
                body:{username}
            })
        }),
        loginUser:builder.query<User,LoginEP>({
            query:(loginEP:LoginEP)=>({
                url:'users/login',
                method:'POST',
                body:{...loginEP}
                
            })
        }),
        getUserPosts: builder.query<ProfilePost[],number>({
            query: (userId:number) => ({
                url:`users/${userId}/posts`
            })
        }),
        registerUser: builder.query<User,RegisterUser>({
            query:(registerUser:RegisterUser)=>({
                url:'users/register',
                method:'POST',
                body:{...registerUser}
            })
        })
    })
})

export const {useLazyGetUserPostsQuery,useLazyRegisterUserQuery, useGetUserPostsQuery, useLazyLoginUserQuery, useLazyCheckUsernameQuery} = usersApi;