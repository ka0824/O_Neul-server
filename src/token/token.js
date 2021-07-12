import "dotenv/config"
const { sign, verify } = require("jsonwebtoken");

module.exports = {
  makeAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: "1s" });
  },
  makeRefreshToken: (data) => {
    return sign(data, process.env.REFRESH_SECRET, { expiresIn: "30d"});
  },
  isAuthorized: (req) => {
    const authorization = req.headers["authorization"];
    if (!authorization) {
      return null;
    }
    const token = authorization.split(" ")[1];
    try {
      return verify(token, process.env.ACCESS_SECRET);
    } catch (error) {
      return null;
    }
  },
  renewAccessToken: (req) => {
    const authorization = req.cookies.refreshToken;
    if (!authorization) {
      return null;
    }
    try {
      return verify(authorization, process.env.REFRESH_SECRET);
    } catch (error) {
      return null;
    }
  }
}