import express from "express";
import { UserDatabase } from "../database/UserDatabase";
import { UserController } from "../controller/UserController"
import { UserBusiness } from "../business/UserBusiness";

const userRouter = express.Router();

const userController = new UserController(new UserBusiness(new UserDatabase()));

userRouter.post("/", userController.createUsers);
userRouter.get("/", userController.getUsers);
userRouter.put("/", userController.updateUsers);
userRouter.delete("/", userController.deleteUsers);

export default userRouter;