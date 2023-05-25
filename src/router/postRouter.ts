import express from "express";
import { PostDatabase } from "../database/PostDatabase";

const postRouter = express.Router();

const postController = new PostController(new PostBusiness(new PostDatabase()));

postRouter.post("/", postController.createPosts);
postRouter.get("/", postController.getPosts);
postRouter.put("/", postController.updatePosts);
postRouter.delete("/", postController.deletePosts);

export default postRouter;