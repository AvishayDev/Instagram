import { LoginEP } from "./types/LoginEP";
import { User } from "./types/User";
import { apiSlice } from "../apiSlice";




export const usersApi = apiSlice.injectEndpoints({
    
    endpoints:(builder)=>({
        getAllUsers:builder.query<User[],void>({
            query: () =>  ({ 
                url:'users', 
                method: 'GET'
            })
        }), //mutation for the rest of Rest Api calls
        checkUsername:builder.query<User,string>({
            query: (username:string) => ({
                url:'user/check',
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
    })
})

export const {useLazyLoginUserQuery, useGetAllUsersQuery} = usersApi;