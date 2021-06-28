import express from "express";
import emphathyController from "../controllers/emphathyController";

const emphathyRouter = express.Router();

emphathyRouter.post("/add", emphathyController.add);
emphathyRouter.delete("/delete", emphathyController.delete);

export default emphathyRouter;