// import { PostDatabase } from "../database/PostDatabase";
// import { CreatePostInputDTO } from "../dtos/dto-post/createPosts.dto";
// import { GetPostsInputDTO } from "../dtos/dto-post/getPosts.dto";
// import { Posts } from "../models/Posts";
// import { TokenManager } from "../services/TokenManager";
// import { IdGenerator } from "../services/idGenerator";
// import { PostDB } from "../types/interface";

// export class PostBusiness {
//     constructor(
//         private postDatabase: PostDatabase,
//         private IdGenerator: IdGenerator,
//         private TokenManager: TokenManager,
//         ) { };

//     public createPosts = async (input: CreatePostInputDTO) => {
//         const { id, creator_id, content, likes, dislikes, created_at, updated_at } = input;

//         const postIdExistDB: PostDB | undefined = await this.postDatabase.findPostId(id);

//         const creatorIdExistDB: PostDB | undefined = await this.postDatabase.findCreatorId(creator_id);

//         if (postIdExistDB && !creatorIdExistDB) {
//             throw new Error("foda-se")
//         };
    
//         const newPost = new Posts(id, content, likes, dislikes, createdAt, updatedAt, creatorId, creatorName);

//         console.log(newPost);

//         const newPostDB = {
//             id: newPost.getId(),
//             creator_id: newPost.getCreatorId(),
//             content: newPost.getContent(),
//             likes: newPost.getLikes(),
//             dislikes: newPost.getDislikes(),
//             created_at: newPost.getCreatedAt(),
//             updated_at: newPost.getUpdatedAt()
//         };

//         await this.postDatabase.insertNewPost(newPostDB, creator_id);

//         const output = {
//             message: "mensagem show, brother", 
//             content: newPost.getContent()
//         };

//         return output

//     };

//     public getPosts = async (input: GetPostsInputDTO) => { 
//         const {q} = input;

//         const getPostsDBExist: string[] | undefined = await this.postDatabase.findPostsByName(q)

//         if(!getPostsDBExist) {
//             throw new Error ("Post não existente")
//         }

//         const output = getPostsDBExist
//         return output
//     }

    
// //     public updatePosts = () => { }
// //     public deletePosts = () => { }



// };