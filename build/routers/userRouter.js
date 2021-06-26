"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userController = _interopRequireDefault(require("../controllers/userController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userRouter = _express["default"].Router();

userRouter.post("/signin", _userController["default"].signIn);
userRouter.post("/signUp", _userController["default"].signUp);
userRouter.patch("/edit", _userController["default"].edit);
var _default = userRouter;
exports["default"] = _default;