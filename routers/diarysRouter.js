import express from "express";
import diarysController from "../controllers/diarysController";

const diarysRouter = express.Router();

diarysRouter.get("/", diarysController.getDiarys);

export default diarysRouter;