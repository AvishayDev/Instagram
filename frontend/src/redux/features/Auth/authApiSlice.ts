import { apiSlice } from "../Api/apiSlice";
import { RegisterUser } from "../Api/users/types/RegisterUser";
import { AuthStateType } from "./authSlice";
import { LoginEP } from "./types/LoginEP";
import { Tokens } from "./types/Tokens";




export const authApi = apiSlice.injectEndpoints({

    endpoints: (builder)=> ({
        login: builder.query<Tokens,LoginEP>({
            query: (loginEP:LoginEP) => ({
                url:'auth/login',
                method:'POST',
                body: loginEP
            })
        }),
        register: builder.query<Tokens,RegisterUser>({
            query: (registerUser:RegisterUser) => ({
                url:'auth/register',
                method:'POST',
                body:registerUser
            })
        }),
        logout: builder.query<void,void>({
            query: ()=> ({
                url:'auth/logout',
                method:'POST',
            })
        })
    })
})


export const {useLazyLoginQuery,useLazyLogoutQuery,useLazyRegisterQuery} = authApi