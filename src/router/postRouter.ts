import express from "express";
import { PostDatabase } from "../database/PostDatabase";
import { PostController } from "../controller/PostController";
import { PostBusiness } from "../business/PostBusiness";
import { IdGenerator } from "../services/idGenerator";
import { TokenManager } from "../services/TokenManager";

const postRouter = express.Router();

const postController = new PostController(
    new PostBusiness(
        new PostDatabase(),
        new IdGenerator(),
        new TokenManager()
        ));

postRouter.post("/", postController.createPosts);
postRouter.get("/", postController.getPosts);
postRouter.put("/:id", postController.updatePosts);
postRouter.delete("/:id", postController.deletePosts);

postRouter.put("/:id/like", postController.likeDislikePosts);

export default postRouter;