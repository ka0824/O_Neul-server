import { user } from "../../models/index"
import { makeAccessToken,makeRefreshToken, isAuthorized } from "../token/token"

module.exports = {
  signIn: async(req, res) => {
    const { email, password } = req.body
    try {
      const isValid = await user.findOne({
        where: {
          email: email,
          password: password
        }
      });
      if (!isValid) {
        res.status(401).send({ message: "invalid email or password!"})
      } else {
        const data = isValid.dataValues;
        delete data.password;
        const accessToken = makeAccessToken(data);
        const refreshToken = makeRefreshToken(data);
        res.status(200).send({
          data: {
            user: data.nickname,
            accessToken: accessToken
          },
          message: "signIn success!"
        })
      }
    } catch (error) {
      res.status(500).send({ message: "server error!"})
    }
  },
  signUp: async(req, res) => {
    const { email, password ,nickname } = req.body
    try {
      const isExistedEmail = await user.findOne({
        where: {
          email: email
        }
      });
      const isExistedNickname = await user.findOne({
        where: {
          nickname: nickname
        }
      });
      if (isExistedEmail) {
        res.status(409).send({ message: "email already existed!"});
      } else if (isExistedNickname) {
        res.status(409).send({ message: "nickname already existed!"});
      } else {
        await user.create({
          email: email,
          password: password,
          nickname: nickname
        })
        res.status(201).send({
          data: {
            email: email,
            nickname: nickname
          },
          message: "signUp success!"
        })
      }
    } catch (error) {
      res.status(500).send({message: "server error!"})
    }
  },
  edit: async(req, res) => {
    const decodedToken = isAuthorized(req);
    const { password, nickname } = req.body;
    try {
      const isExisted = await user.findOne({
        where: { 
          nickname: nickname
        }  
      });
      
      if (!isExisted) {
        await user.update({ password: password, nickname: nickname}, {
          where: { email: decodedToken.email }
        });
        res.status(201).send({ message: "edit userInfo success!" });
      } else {
        if (isExisted.dataValues.email !== decodedToken.email) {
          res.status(409).send({ message: "nickname already existed"})
        } else {
          await user.update({ password: password, nickname: nickname}, {
            where: { email: decodedToken.email }
          });
          res.status(201).send({ message: "edit userInfo success!" });
        }
      }
      
    } catch (error) {
      res.status(500).send({ message: "sever error!"})
    }
  }
}