require("dotenv").config();
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
    // const verified = verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiIxMjM0QGdtYWlsLmNvbSIsIm5pY2tuYW1lIjoiMTIzNCIsImNyZWF0ZWRBdCI6IjIwMjEtMDYtMjVUMDI6MzI6MjEuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjEtMDYtMjVUMDI6MzI6MjEuMDAwWiIsImlhdCI6MTYyNDU5NDQ4MCwiZXhwIjoxNjI0NjgwODgwfQ.hnnpqcNOa2bBbAEjPdFUy1ou1oDTjxhGu2YVC57jpnQ", process.env.ACCESS_SECRET);
    // console.log(verified);
    // const token = authorization.split(" ")[1];
    // console.log(token);
    try {
      return verify(authorization, process.env.ACCESS_SECRET);
    } catch (error) {
      return null;
    }
  }
}