"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _diarysRouter = _interopRequireDefault(require("./routers/diarysRouter"));

var _userRouter = _interopRequireDefault(require("./routers/userRouter"));

var _emphathyRouter = _interopRequireDefault(require("./routers/emphathyRouter"));

var _postRouter = _interopRequireDefault(require("./routers/postRouter"));

var _oauthRouter = _interopRequireDefault(require("./routers/oauthRouter"));

require("dotenv/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use((0, _expressSession["default"])({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(_express["default"].json());
app.use((0, _cors["default"])());
app.get("/", function (req, res) {
  return res.send("Hello World!");
});
app.use("/oauth", _oauthRouter["default"]);
app.use("/diarys", _diarysRouter["default"]);
app.use("/user", _userRouter["default"]);
app.use("/emphathy", _emphathyRouter["default"]);
app.use("/post", _postRouter["default"]);
var _default = app;
exports["default"] = _default;