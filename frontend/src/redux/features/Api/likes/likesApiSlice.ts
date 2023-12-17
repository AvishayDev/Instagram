import { apiSlice } from "../apiSlice";
import { SignLikeResult, SignLikeType, UnsignLikeResult } from "./types/signAndUnsign";




export const likesApi = apiSlice.injectEndpoints({

    endpoints: (builder)=> ({
        signLike: builder.query<SignLikeResult,SignLikeType>({
            query: (signLike : SignLikeType) => ({
                url:'likes/sign',
                method:'POST',
                body: {...signLike}
            })
        }),
        unsignLike: builder.query<UnsignLikeResult,SignLikeType>({
            query: (unsignLike : SignLikeType) => ({
                url:'likes/unsign',
                method:'DELETE',
                body: {...unsignLike}
            })
        })
    })
})

export const {useLazySignLikeQuery, useLazyUnsignLikeQuery} = likesApi;