"use strict";

require("regenerator-runtime");

var _app = _interopRequireDefault(require("./app.js"));

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var port = 80;

_app["default"].listen(port, function () {
  console.log("Sever listening on port http://localhost:".concat(port));
});