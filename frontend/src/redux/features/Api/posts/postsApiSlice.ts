import { apiSlice } from "../apiSlice";
import { FeedPost } from "./types/FeedPost";
import { GetFeedPosts } from "./types/GetPosts";





export const postsApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getPosts:builder.query<FeedPost[],GetFeedPosts>({
            query: (getFeedPosts:GetFeedPosts) => ({
                url:`posts?page=${getFeedPosts.page}&userId=${getFeedPosts.userId}`
            }),
        })
    })
})

export const {useLazyGetPostsQuery} = postsApi;