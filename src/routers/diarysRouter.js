import express from "express";
import diarysController from "../controllers/diarysController";

const diarysRouter = express.Router();

diarysRouter.get("/",diarysRouter.getDiarys);

export default diarysRouter;