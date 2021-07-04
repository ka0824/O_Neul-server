import express from "express";
import mainController from "../controllers/mainController";

const mainRouter = express.Router();

mainRouter.get("/", mainController.getDiarys);

export default mainRouter;