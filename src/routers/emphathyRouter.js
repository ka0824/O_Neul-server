import express from "express";
import emphathyController from "../controllers/emphathyController";

const emphathyRouter = express.Router();

emphathyRouter.post("/plus", emphathyController.plus);
emphathyRouter.delete("/minus", emphathyController.minus);

export default emphathyRouter;