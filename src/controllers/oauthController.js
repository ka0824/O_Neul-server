import "dotenv/config"
import axios from "axios";
import { user } from "../../models/index"
import { makeAccessToken, makeRefreshToken } from "../token/token"

module.exports = {
  getCode: async (req, res) => {
    const { siteName } = req. body
    try {
      if(siteName === "naver") {
        const state = "naver";
        const naverLoginUrl = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + process.env.NAVER_CLIENTID + '&redirect_uri=' + process.env.REDIRECTURL + '&state=' + state;
        res.send(naverLoginUrl);

      } else if (siteName === "kakao") {
        const state = "kakao";
        const kakaoLoginUrl = 'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=' + process.env.KAKAO_RESTAPI + '&redirect_uri=' + process.env.REDIRECTURL + '&state=' + state;
        res.send(kakaoLoginUrl);

      } else if (siteName === "google") {
        const state = "google";
        const googleLoginurl = 'https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=' + process.env.GOOGLE_CLIENTID + '&redirect_uri=' + process.env.REDIRECTURL + '&state=' + state + '&scope=email%20profile'
        res.send(googleLoginurl);
      }
    } catch (err) {
      res.status(500).send({ message: "server error!" })
    }
    
  },
  loginCallback: async (req, res) => {
    try {
      const { code, state } = req.body;
      if (state === "naver") {
        const naverTokenUrl = ('https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='
         + process.env.NAVER_CLIENTID + '&client_secret=' + process.env.NAVER_SECRET + '&redirect_uri=' + process.env.REDIRECTURL + '&code=' + code + '&state=' + state)
        const naverToken = await axios.get(naverTokenUrl)
          .then(res => {return res.data.access_token})

        const header = "Bearer " + naverToken;
        const naverData = await axios.get("https://openapi.naver.com/v1/nid/me",
         {headers: {'Authorization': header}})
          .then((res) => {return {email: res.data.response.email, nickname: res.data.response.nickname}})
      
        await user.findOrCreate({
          where: {
            email: naverData.email
          },
          defaults: {
            nickname: "naver_" + naverData.nickname,
            password: naverToken
          }
        })

        const data = {
          email: naverData.email,
          nickname: "naver_" + naverData.nickname
        }
      
        const accessToken = makeAccessToken(data);
        const refreshToken = makeRefreshToken(data);

        res.status(200).setHeader("authorization", refreshToken).send({
          data: { 
            user: "naver_" + naverData.nickname, 
            accessToken: accessToken},
          message: "Oauth login success!"
        })
      } else if (state === "kakao") {
        
        const kakaoTokenUrl = 'https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=' + process.env.KAKAO_RESTAPI + '&redirect_uri=' + process.env.REDIRECTURL + '&code=' + code;
        
        const kakaoToken = await axios.get(kakaoTokenUrl)
          .then(res => {return res.data.access_token})
        
        const header = "Bearer " + kakaoToken;
        
        const kakaoData = await axios.get("https://kapi.kakao.com/v2/user/me",
         {headers: {'Authorization': header}})
          .then((res) => {return res.data.kakao_account.profile.nickname})
        
          await user.findOrCreate({
            where: {
              nickname: "kakao_" + kakaoData
            },
            defaults: {
              email: 'kakaoLogin',
              password: kakaoToken
            }
          })
  
          const data = {
            email: 'kakaoLogin',
            nickname: "kakao_" + kakaoData
          }
          const accessToken = makeAccessToken(data);
          const refreshToken = makeRefreshToken(data);
  
          res.status(200).setHeader("authorization", refreshToken).send({
            data: { 
              user: "kakao_" + kakaoData, 
              accessToken: accessToken},
            message: "Oauth login success!"
        
            })} else {
              
              const googleTokenUrl = 'https://accounts.google.com/o/oauth2/token?grant_type=authorization_code&client_id=' + process.env.GOOGLE_CLIENTID + '&redirect_uri=' + process.env.REDIRECTURL + '&client_secret=' + process.env.GOOGLE_SECRET + '&code=' + code;
              const googleToken = await axios.post(googleTokenUrl)
                .then(res => {return res.data});
              
              const header = "Bearer " + googleToken.access_token; 
 
              const googleData = await axios.get("https://oauth2.googleapis.com/tokeninfo",
                {
                  params: { id_token: googleToken.id_token },
                  headers: {'Authorization': header}
                })
                  .then(res => {return res.data.email});
              
                  
              const newGoogleUser = await user.findOrCreate({
                where: {
                  email: googleData
                },
                defaults: {
                  nickname: null,
                  password: googleToken.access_token
                }
              })

              await user.update({
                nickname: "google_" + newGoogleUser[0].dataValues.id
              }, {
                where: {
                  email: googleData
                }
              })
 
              const data = {
                email: googleData,
                nickname: "google_" + newGoogleUser[0].dataValues.id,
              }
            
              const accessToken = makeAccessToken(data);
              const refreshToken = makeRefreshToken(data);
              
              res.status(200).setHeader("authorization", refreshToken).send({
                data: {
                  user: data.nickname,
                  accessToken: accessToken
                },
                message: "Oauth login success!"
              }); 
            }
    } catch (error) {
      res.status(500).send({ message: "server error!"})
    }
  }
}