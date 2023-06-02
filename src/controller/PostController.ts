// import { Request, Response } from "express";
// import { PostBusiness } from "../business/PostBusiness";
// import { CreatePostSchema } from "../dtos/dto-post/createPosts.dto";
// import { GetPostsSchema } from "../dtos/dto-post/getPosts.dto";

// classes instanciam objetos - Programação orientada a objetos
// quando se chama uma classe, se esta chamando um instancia de um objeto ou o metodo dessa classe (por isso existe o constructor e metodos)
// export class PostController {
//     constructor(private postBusiness: PostBusiness) { };

//     public createPosts = async (req: Request, res: Response): Promise<void> => {
//         try {
//             const input = CreatePostSchema.parse({
//                 id: req.body.id,
//                 creator_id: req.body.creator_id,
//                 content: req.body.content,
//                 likes: req.body.likes,
//                 dislikes: req.body.dislikes,
//                 created_at: req.body.created_at,
//                 updated_at: req.body.updated_at
//             });

//             const output = await this.postBusiness.createPosts(input)
//             res.status(201).send(output)
//         } catch (error) {

//         };
//     };

//     public getPosts = async (req: Request, res: Response): Promise<void> => {
//         try {
//             const input = GetPostsSchema.parse ({
//                 q: req.query.q
//             })

//             const output = await this.postBusiness.getPosts(input)
//             res.status(201).send(output)
//         } catch (error) {

//         };
//     };

//     public updatePosts = async (req: Request, res: Response): Promise<void> => {
//         try {

//         } catch (error) {

//         };
//     };

//     public deletePosts = async (req: Request, res: Response): Promise<void> => {
//         try {

//         } catch (error) {

//         };
//     };

// };