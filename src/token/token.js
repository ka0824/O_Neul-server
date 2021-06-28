import "dotenv/config"
const { sign, verify } = require("jsonwebtoken");

module.exports = {
  makeAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: "1d" });
  },
  makeRefreshToken: (data) => {
    return sign(data, process.env.REFRESH_SECRET, { expiresIn: "30d"});
  },
  isAuthorized: (req) => {
    const authorization = req.headers["authorization"];
    if (!authorization) {
      return null;
    }
    try {
      return verify(authorization, process.env.ACCESS_SECRET);
    } catch (error) {
      return null;
    }
  },
  renewAccessToken: (req) => {
    const refreshAuthorization = req.headers["refreshauthorization"];
    if (!refreshAuthorization) {
      return null;
    }
    try {
      return verify(refreshAuthorization, process.env.REFRESH_SECRET);
    } catch (error) {
      return null;
    }
  }
}