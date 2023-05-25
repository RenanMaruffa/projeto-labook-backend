import express from "express";
import { LikeDislikeDatabase } from "../database/LikeDislikeDatabase";

const likeDislikeRouter = express.Router();

const likeDislikeController = new LikeDislikeController(new LikeDislikeBusiness(new LikeDislikeDatabase()));

likeDislikeRouter.post("/", likeDislikeController.createLikes);
likeDislikeRouter.get("/", likeDislikeController.getLikes);
likeDislikeRouter.put("/", likeDislikeController.updateLikes);
likeDislikeRouter.delete("/", likeDislikeController.deleteLikes);


export default likeDislikeRouter;