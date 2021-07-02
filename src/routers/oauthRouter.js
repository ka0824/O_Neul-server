import express from "express";
import oauthController from "../controllers/oauthController";

const oauthRouter = express.Router();

oauthRouter.post("/getCode", oauthController.getCode);

oauthRouter.post("/login", oauthController.login);

export default oauthRouter;