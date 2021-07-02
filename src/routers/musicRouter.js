import express from "express";
import musicController from "../controllers/musicController";

const musicRouter = express.Router();

musicRouter.get("/getList", musicController.getList);

export default musicRouter;