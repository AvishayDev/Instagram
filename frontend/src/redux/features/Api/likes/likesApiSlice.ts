import { apiSlice } from "../apiSlice";
import { SignLikeResult, SignLikeType, UnsignLikeResult } from "./types/signAndUnsign";




export const likesApi = apiSlice.injectEndpoints({

    endpoints: (builder)=> ({
        signLike: builder.mutation<SignLikeResult,SignLikeType>({
            query: (signLike : SignLikeType) => ({
                url:'likes/sign',
                method:'POST',
                body: {...signLike}
            })
        }),
        unsignLike: builder.mutation<UnsignLikeResult,SignLikeType>({
            query: (unsignLike : SignLikeType) => ({
                url:'likes/unsign',
                method:'POST',
                body: {...unsignLike}
            })
        })
    })
})

export const {useSignLikeMutation,useUnsignLikeMutation} = likesApi;