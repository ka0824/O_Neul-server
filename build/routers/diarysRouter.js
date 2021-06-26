"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _diarysController = _interopRequireDefault(require("../controllers/diarysController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var diarysRouter = _express["default"].Router();

diarysRouter.get("/", _diarysController["default"].getDiarys);
var _default = diarysRouter;
exports["default"] = _default;