import express from "express";
import postController from "../controllers/postController"

const postRouter = express.Router();

postRouter.post("/write", postController.write);
postRouter.delete("/delete", postController.delete);
postRouter.patch("/edit", postController.edit);

export default postRouter;