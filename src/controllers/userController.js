import { user } from "../../models/index"
import { makeAccessToken,makeRefreshToken, isAuthorized, renewAccessToken } from "../token/token"
import bcrypt from "bcrypt";

module.exports = {
  signIn: async(req, res) => {
   
    const { email, password } = req.body
    try {
      const isValid = await user.findOne({ where: { email, password } });
      if (!isValid) {
        res.status(401).send({ message: "invalid email or password!"})
      } else {
        const allData = isValid.dataValues;
        const { id, password, createdAt, updatedAt, ...someData } = allData

        const accessToken = makeAccessToken(someData);
        const refreshToken = makeRefreshToken(someData);

        res.status(200).setHeader("authorization", refreshToken).send({
          data: { ...someData, accessToken },
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
      const isExistedEmail = await user.findOne({ where: { email } });
      const isExistedNickname = await user.findOne({ where: { nickname: nickname } });
      if (isExistedEmail) {
        res.status(409).send({ message: "email already existed!"});
      } else if (isExistedNickname) {
        res.status(409).send({ message: "nickname already existed!"});
      } else {
        const data = await user.create({
          email,
          password,
          nickname,
          picture: "https://oneulfile.s3.amazonaws.com/profile/default.jpeg"
        }).then(res => { return res.dataValues });
       
        ['id', 'password', 'createdAt', 'updatedAt'].map(field => { delete data[field] });
        
        res.status(201).send({ data: { user: data }, message: "signUp success!" });
      }
    } catch (error) {
      res.status(500).send({message: "server error!"});
    }
  },
  edit: async(req, res) => {
    const decodedToken = isAuthorized(req);
    const { password, nickname } = req.body;
    try {
      const isExisted = await user.findOne({ where: { nickname: nickname } });
      
      if (!isExisted) {
        await user.update({ password, nickname}, {
          where: { email: decodedToken.email }
        });
        res.status(201).send({ message: "edit userInfo success!" });
      } else {
        if (isExisted.dataValues.email !== decodedToken.email) {
          res.status(409).send({ message: "nickname already existed"})
        } else {
          await user.update({ password, nickname}, {
            where: { email: decodedToken.email }
            });
          res.status(201).send({ 
            data: { user: { nickname: nickname } },
            message: "edit userInfo success!" 
          });
        }
      }     
    } catch (error) {
      res.status(500).send({ message: "sever error!"})
    }
  },
  renew: async (req, res) => {
    try {
      const isValidRefreshToken = renewAccessToken(req);
      if (isValidRefreshToken === null) {
        res.status(401).send({ message: "You have to login" })
      } else {
        const data = {
          email: isValidRefreshToken.email,
          nickname: isValidRefreshToken.nickname,
          picture: isValidRefreshToken.picture
        }
        const accessToken = makeAccessToken(data);

        res.status(200).send({
          data: {accessToken}, 
          message: "get new access token success!"
        })
      }      
    } catch (error) {
      res.status(500).send( { message: "server error!" })
    }
  },
  getUserInfo: async (req, res) => {
    try {
      const decodedToken = isAuthorized(req);
      if (!decodedToken) {
        res.status(401).send( {message: "You have to signIn" });
      } else {
        res.status(200).send( {
          data: {
            user: {
              email: decodedToken.email,
              nickname: decodedToken.nickname,
              picture: decodedToken.picture
            }            
          },
          message: "getUserInfo success!"
        })
      }
    } catch (error) {
      res.status(500).send( { message: "server error!" })
    }
  }
}