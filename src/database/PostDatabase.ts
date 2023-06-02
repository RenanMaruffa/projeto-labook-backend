import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {
    public static TABLE_POSTS = "posts";

    public findPostId = async (id: string): Promise<any> => {
        const [result]: any[] = await BaseDatabase.conection(PostDatabase.TABLE_POSTS).where({ id })
        return result
    };

    public findCreatorId = async (creator_id: string): Promise<any> => {
        const [result]: any[] = await BaseDatabase.conection(PostDatabase.TABLE_POSTS).where({ creator_id })
        return result        
    };

    // public insertNewPost = async (newPostDB: PostDBPost, creator_id: string): Promise<void> => {
    //     await BaseDatabase.conection(PostDatabase.TABLE_POSTS).insert({newPostDB, creator_id}) 
    //     //rever isso aqui =>

    // };

    public findPostsByName = async (q: string) => {
        let postsDB

        if (q) {
            const result = await BaseDatabase.conection(PostDatabase.TABLE_POSTS).where("content", "LIKE", `%${q}%`);
            postsDB = result
        } else {
            const result = await BaseDatabase.conection(PostDatabase.TABLE_POSTS)
            postsDB = result
        }
        return postsDB
    }



};