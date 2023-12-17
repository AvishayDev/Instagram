

/**
 *              'user.profileImageUrl AS userProfileImageUrl',
                'user.firstName AS userFirstName',
                'user.lastName AS userLastName',
                'post.createdAt AS uploadDate',
                'post.imageUrl AS imageUrl',
                'post.text AS text',
                'post.id AS postId',
                'COUNT(like.id) AS likes',
                `COUNT(CASE WHEN like.user.id = :userId THEN 1 ELSE NULL END) AS isLiked`,

 */

export type FeedPost = {
    user_profile_image_url:string,
    user_firstname:string,
    user_lastname:string,
    upload_date:Date,
    image_url:string,
    text:string,
    post_id:number,
    likes:number,
    is_liked:boolean
}