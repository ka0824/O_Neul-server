import express from "express";
import diaryController from "../controllers/diaryController"

const diaryRouter = express.Router();

diaryRouter.post("/write", diaryController.write);
diaryRouter.delete("/delete", diaryController.delete);
diaryRouter.get("/get", diaryController.get)
diaryRouter.patch("/edit", diaryController.edit);

export default diaryRouter;