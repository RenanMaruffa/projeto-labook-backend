import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { CreatePostSchema } from "../dtos/dto-post/createPosts.dto";
import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError";
import { GetPostsSchema } from "../dtos/dto-post/getPosts.dto";
import { EditPostSchema } from "../dtos/dto-post/updatePosts.dto";
import { DeletePostSchema } from "../dtos/dto-post/deletePosts.dto";
import { LikeOrDislikeSchema } from "../dtos/dto-post/likeOrDislikePost.dto";

// classes instanciam objetos - Programação orientada a objetos
// quando se chama uma classe, se esta chamando um instancia de um objeto ou o metodo dessa classe (por isso existe o constructor e metodos)


export class PostController {
    constructor(private postBusiness: PostBusiness) { };

    public createPosts = async (req: Request, res: Response) => {
        try {

            const input = CreatePostSchema.parse({
                content: req.body.content,
                token: req.headers.authorization
            });

            const output = await this.postBusiness.createPosts(input)

            res.status(201).send(output)

        } catch (error) {
            console.log(error);
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro Inesperado!")
            }
        }
    };


    public getPosts = async (req: Request, res: Response) => {
        try {

            const input = GetPostsSchema.parse({
                token: req.headers.authorization
            })

            const output = await this.postBusiness.getPosts(input)

            res.status(200).send(output)

        } catch (error) {
            console.log(error);
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro Inesperado!")
            }
        }
    };

    public updatePosts = async (req: Request, res: Response): Promise<void> => {
        try {

            const input = EditPostSchema.parse({
                token: req.headers.authorization,
                content: req.body.content,
                idToEdit: req.params.id
            })

            const output = await this.postBusiness.updatePosts(input)

            res.status(200).send(output)

        } catch (error) {
            console.log(error);
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro Inesperado!")
            }
        }
    };

    public deletePosts = async (req: Request, res: Response): Promise<void> => {
        try {
            const input = DeletePostSchema.parse({
                token: req.headers.authorization,
                idToDelete: req.params.id
            });

            const output = await this.postBusiness.deletePost(input);

            res.status(200).send(output);

        } catch (error) {
            console.log(error);
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro Inesperado!")
            }
        }
    };

    public likeDislikePosts = async (req: Request, res: Response): Promise<void> => {
        try {
            const input = LikeOrDislikeSchema.parse ({
                token: req.headers.authorization,
                postId: req.params.id,
                like: req.body.like,
            });

            const output = await this.postBusiness.likeDislikePosts(input);

            res.status(200).send(output);

        } catch (error) {
            console.log(error);
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro Inesperado!")
            }
        }
    };

};