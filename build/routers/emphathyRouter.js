"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _emphathyController = _interopRequireDefault(require("../controllers/emphathyController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var emphathyRouter = _express["default"].Router();

emphathyRouter.post("/plus", _emphathyController["default"].plus);
emphathyRouter["delete"]("/minus", _emphathyController["default"].minus);
var _default = emphathyRouter;
exports["default"] = _default;