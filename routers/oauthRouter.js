import express from "express";
import oauthController from "../controllers/oauthController";

const oauthRouter = express.Router();

oauthRouter.get("/naver", oauthController.loginNaver);
oauthRouter.get("/kakao", oauthController.loginKakao);
oauthRouter.get("/google", oauthController.loginGoogle);
oauthRouter.post("/login", oauthController.loginCallback);

export default oauthRouter;