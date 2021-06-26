"use strict";

require("dotenv/config");

var _require = require("jsonwebtoken"),
    sign = _require.sign,
    verify = _require.verify;

module.exports = {
  makeAccessToken: function makeAccessToken(data) {
    return sign(data, process.env.ACCESS_SECRET, {
      expiresIn: "1d"
    });
  },
  makeRefreshToken: function makeRefreshToken(data) {
    return sign(data, process.env.REFRESH_SECRET, {
      expiresIn: "30d"
    });
  },
  isAuthorized: function isAuthorized(req) {
    var authorization = req.headers["authorization"];

    if (!authorization) {
      return null;
    }

    try {
      return verify(authorization, process.env.ACCESS_SECRET);
    } catch (error) {
      return null;
    }
  }
};