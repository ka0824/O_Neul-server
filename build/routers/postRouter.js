"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _postController = _interopRequireDefault(require("../controllers/postController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var postRouter = _express["default"].Router();

postRouter.post("/write", _postController["default"].write);
postRouter["delete"]("/delete", _postController["default"]["delete"]);
postRouter.patch("/edit", _postController["default"].edit);
var _default = postRouter;
exports["default"] = _default;