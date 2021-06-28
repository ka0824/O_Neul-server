import express from "express";
import userController from "../controllers/userController";

const userRouter = express.Router();

userRouter.post("/signin", userController.signIn);
userRouter.post("/signUp", userController.signUp);
userRouter.patch("/edit", userController.edit);
userRouter.get("/renew", userController.renew)

export default userRouter;