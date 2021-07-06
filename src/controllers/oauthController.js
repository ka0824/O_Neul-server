import "dotenv/config"
import { user } from "../../models/index"
import { makeAccessToken, makeRefreshToken } from "../token/token"
import { makeSocialUrl, getSocialInfo } from "../util/oauthFuncs"
import bcrypt from "bcrypt";

module.exports = {
  getCode: async (req, res) => {
    const { siteName } = req. body
    try {
      const socialUrl = makeSocialUrl(siteName);
      res.status(200).send(socialUrl);
    } catch (err) {
      res.status(500).send({ message: "server error!" })
    }
  },
  login: async (req, res) => {
    try {
      const { code, state } = req.body;
      const socialInfo = getSocialInfo(code, state);
      const randomPassword = Math.random().toString(36).slice(2);
      const hashedPassword = await bcrypt.hashSync(randomPassword, parseInt(process.env.SALT_ROUNDS));
     
      if (state === "naver") {
        
        const isValid = await user.findOne({
          where: {email: socialInfo.email}
        });

        if(!isValid) {
          const userInfo = await user.create({
            email: socialInfo.email,
            nickname: "naver_" + socialInfo.nickname,
            password: hashedPassword,
            picture: "https://oneulfile.s3.amazonaws.com/profile/default.jpeg",
            isSocialLogin: true
          }).then(res => {return res.dataValues})
           
          delete userInfo.password;
        
          const accessToken = makeAccessToken(userInfo);
          const refreshToken = makeRefreshToken(userInfo);
          
          res.cookie("refreshToken", refreshToken, { 
            httpOnly: true,
            sameSite: "none",
            secure: true
          });
         
          res.status(200).send({
            data: { user: userInfo, accessToken },
            message: "Oauth login success!"
          })
        } else {
          const userInfo = isValid.dataValue;

          delete userInfo.password;
        
          const accessToken = makeAccessToken(userInfo);
          const refreshToken = makeRefreshToken(userInfo);
          
          res.cookie("refreshToken", refreshToken, { 
            httpOnly: true,
            sameSite: "none",
            secure: true
          });
          res.status(200).send({
            data: { user: userInfo, accessToken },
            message: "Oauth login success!"
          })

        }

      } else if (state === "kakao") {
        const isValid = await user.findOne({
          where: {email: "kakao_" + socialInfo}
        });

        if(!isValid) {
          const userInfo = await user.create({
            email: "kakao_" + socialInfo,
            nickname: "kakao_" + socialInfo,
            password: hashedPassword,
            picture: "https://oneulfile.s3.amazonaws.com/profile/default.jpeg",
            isSocialLogin: true
          })
  
          delete userInfo.password;

          const accessToken = makeAccessToken(userInfo);
          const refreshToken = makeRefreshToken(userInfo);
  
          res.cookie("refreshToken", refreshToken, { 
            httpOnly: true,
            sameSite: "none",
            secure: true
          });
         
          res.status(200).send({
            data: { user: userInfo, accessToken },
            message: "Oauth login success!"
          });
        } else {
          const userInfo = isValid.dataValues;

          delete userInfo.password;
        
          const accessToken = makeAccessToken(userInfo);
          const refreshToken = makeRefreshToken(userInfo);
          
          res.cookie("refreshToken", refreshToken, { 
            httpOnly: true,
            sameSite: "none",
            secure: true
          });
          res.status(200).send({
            data: { user: userInfo, accessToken },
            message: "Oauth login success!"
          })
        }

        } else if (state === "google") {
          const isValid = await user.findOne({
            where: {email: socialInfo}
          });

          if(!isValid) {
            const userInfo = await user.create({
              email: socialInfo,
              nickname: null,
              password: hashedPassword,
              picture: "https://oneulfile.s3.amazonaws.com/profile/default.jpeg",
              isSocialLogin: true
            });
            await user.update({
              nickname: "google_" + newGoogleUser[0].dataValues.id
              }, {
                where: {
                  email: googleData
                }
            })
 
            userInfo.nickname = "google_" + newGoogleUser[0].dataValues.id;
            
            const accessToken = makeAccessToken(userInfo);
            const refreshToken = makeRefreshToken(userInfo);
              
            res.cookie("refreshToken", refreshToken, { 
              httpOnly: true,
              sameSite: "none",
              secure: true
            });
         
            res.status(200).send({
              data: { user: userInfo, accessToken },
              message: "Oauth login success!"
            });

          } else {
          const userInfo = isValid.dataValue;

          delete userInfo.password;
        
          const accessToken = makeAccessToken(userInfo);
          const refreshToken = makeRefreshToken(userInfo);
          
          res.cookie("refreshToken", refreshToken, { 
            httpOnly: true,
            sameSite: "none",
            secure: true
          });
          res.status(200).send({
            data: { user: userInfo, accessToken },
            message: "Oauth login success!"
          })
          }
             
      }
    } catch (error) {
      res.status(500).send({ message: "server error!"})
    }
  }
}