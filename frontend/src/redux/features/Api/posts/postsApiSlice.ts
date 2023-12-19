import { apiSlice } from "../apiSlice";
import { ProfilePost } from "../../../../types/ProfilePost";
import { FeedPost } from "./types/FeedPost";
import { GetFeedPosts } from "./types/GetPosts";
import { SharePost } from "./types/SharePost";





export const postsApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getPosts:builder.query<{posts:FeedPost[],hasNext:boolean},GetFeedPosts>({
            query: (getFeedPosts:GetFeedPosts) => ({
                url:`posts?page=${getFeedPosts.page}&userId=${getFeedPosts.userId}`
            }),
        }),
        sharePost: builder.query<void,SharePost>({
            query: (sharePostArgs: SharePost) => ({
                url: 'posts/add',
                method:"POST",
                body: sharePostArgs
            })
        })
    })
})

export const {useLazyGetPostsQuery,useLazySharePostQuery} = postsApi;