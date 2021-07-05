import express from "express";
import userController from "../controllers/userController";

const userRouter = express.Router();

userRouter.post("/signin", userController.signIn);
userRouter.post("/signUp", userController.signUp);
userRouter.patch("/edit", userController.edit);
userRouter.get("/signOut", userController.signOut);
userRouter.get("/renewToken", userController.renewToken);
userRouter.get("/getuserInfo", userController.getUserInfo);
userRouter.patch("/updatePicture", userController.updatePicture);

export default userRouter;