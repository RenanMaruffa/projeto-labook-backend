import { LikeDislikeDB, POST_LIKE, PostDB, PostDBWithCreatorName } from "../types/interface";
import { BaseDatabase } from "./BaseDatabase";
import { UserDatabase } from "./UserDatabase";

export class PostDatabase extends BaseDatabase {
    public static TABLE_POSTS = "posts";
    public static TABLE_LIKES_DISLIKES = "likes_dislikes"

    public insertNewPost = async (newPostDB: PostDB): Promise<void> => {
        await BaseDatabase
        .conection(PostDatabase.TABLE_POSTS)
        .insert(newPostDB);
    };

        public getPostsWhitCreatorName = 
        async (): Promise<PostDBWithCreatorName[]> => {
            
            const result = await BaseDatabase
            .conection(PostDatabase.TABLE_POSTS)
            .select(
                `${PostDatabase.TABLE_POSTS}.id`,
                `${PostDatabase.TABLE_POSTS}.creator_id`,
                `${PostDatabase.TABLE_POSTS}.content`,
                `${PostDatabase.TABLE_POSTS}.likes`,
                `${PostDatabase.TABLE_POSTS}.dislikes`,
                `${PostDatabase.TABLE_POSTS}.created_at`,
                `${PostDatabase.TABLE_POSTS}.updated_at`,
                `${UserDatabase.TABLE_USERS}.name as creator_name`
            )
            .join(`${UserDatabase.TABLE_USERS}`, // qual tabela será dado o JOIN
            `${PostDatabase.TABLE_POSTS}.creator_id`, // qual coluna de qual tabela sera referenciado o JOIN
            "=", 
            `${UserDatabase.TABLE_USERS}.id`)

            return result as PostDBWithCreatorName[]
        };

        public findPostById = async (id: string): Promise<PostDB | undefined> => {
            const [result] = await BaseDatabase.conection(PostDatabase.TABLE_POSTS).select().where({ id })

            return result as PostDB | undefined
        };

        public updatePost = async (postsDB: PostDB): Promise<void> => {
            await BaseDatabase
            .conection(PostDatabase.TABLE_POSTS)
            .update(postsDB)
            .where({id: postsDB.id});
        };

        public deletePostByID = async (id: string): Promise <void> => {
            await BaseDatabase.conection(PostDatabase.TABLE_POSTS)
                .delete()
                .where({id})
        };

        public findPostsWithCreatorNameDBById = 
        async (id: string): Promise<PostDBWithCreatorName | undefined> => {
            
            const [result] = await BaseDatabase
            .conection(PostDatabase.TABLE_POSTS)
            .select(
                `${PostDatabase.TABLE_POSTS}.id`,
                `${PostDatabase.TABLE_POSTS}.creator_id`,
                `${PostDatabase.TABLE_POSTS}.content`,
                `${PostDatabase.TABLE_POSTS}.likes`,
                `${PostDatabase.TABLE_POSTS}.dislikes`,
                `${PostDatabase.TABLE_POSTS}.created_at`,
                `${PostDatabase.TABLE_POSTS}.updated_at`,
                `${UserDatabase.TABLE_USERS}.name as creator_name`
            )
            .join(`${UserDatabase.TABLE_USERS}`, // qual tabela será dado o JOIN
            `${PostDatabase.TABLE_POSTS}.creator_id`, // qual coluna de qual tabela sera referenciado o JOIN
            "=", 
            `${UserDatabase.TABLE_USERS}.id`)
            .where({[`${PostDatabase.TABLE_POSTS}.id`]: id})

            return result as PostDBWithCreatorName | undefined
        };

        
        public findLikeDislike = async (likeDislikeDB: LikeDislikeDB): Promise<POST_LIKE | undefined> => {
            // POST_LIKE.LIKED = ja demos like
            // POST_LIKE.DISLIKED = ja demos dislike
            // undefined = nao demos nada

            const [result]: Array<LikeDislikeDB | undefined> = await BaseDatabase
            .conection(PostDatabase.TABLE_LIKES_DISLIKES)
            .select()
            .where({
                user_id: likeDislikeDB.user_id,
                post_id: likeDislikeDB.post_id
            })
            if (result === undefined) {
                return undefined
                
            } else if (result.like === 1) {
                return POST_LIKE.LIKED
                
            } else {
                return POST_LIKE.DISLIKED
            }
        };   

        public removeLikeDislike = async (likeDislikeDB: LikeDislikeDB): Promise<void> => {
            await BaseDatabase
            .conection (PostDatabase.TABLE_LIKES_DISLIKES)
            .delete()
            .where({user_id: likeDislikeDB.user_id,
                post_id: likeDislikeDB.post_id})
        };

        public updateLikeDislike = async (likeDislikeDB: LikeDislikeDB): Promise<void> => {
            await BaseDatabase
            .conection (PostDatabase.TABLE_LIKES_DISLIKES)
            .update(likeDislikeDB)
            .where({user_id: likeDislikeDB.user_id,
                post_id: likeDislikeDB.post_id})
        };

        public inserLikeDislike = async (likeDislikeDB: LikeDislikeDB): Promise<void> => {
            await BaseDatabase
            .conection (PostDatabase.TABLE_LIKES_DISLIKES)
            .insert(likeDislikeDB)
        };
}


        // public findCreatorId = async (creator_id: string): Promise<any> => {
        //     const [result]: any[] = await BaseDatabase.conection(PostDatabase.TABLE_POSTS).where({ creator_id })
        //     return result        
        // };

    // public findPostsByName = async (q: string) => {
    //     let postsDB

    //     if (q) {
    //         const result = await BaseDatabase.conection(PostDatabase.TABLE_POSTS).where("content", "LIKE", `%${q}%`);
    //         postsDB = result
    //     } else {
    //         const result = await BaseDatabase.conection(PostDatabase.TABLE_POSTS)
    //         postsDB = result
    //     }
    //     return postsDB
    // }



