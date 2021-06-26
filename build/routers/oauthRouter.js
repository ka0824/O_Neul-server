"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _oauthController = _interopRequireDefault(require("../controllers/oauthController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var oauthRouter = _express["default"].Router();

oauthRouter.get("/naver", _oauthController["default"].loginNaver);
oauthRouter.get("/kakao", _oauthController["default"].loginKakao);
oauthRouter.get("/google", _oauthController["default"].loginGoogle);
oauthRouter.post("/login", _oauthController["default"].loginCallback);
var _default = oauthRouter;
exports["default"] = _default;