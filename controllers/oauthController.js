require("dotenv").config();
import axios from "axios";
import { user } from "../models/index"
import { makeAccessToken, makeRefreshToken } from "../token/token"

module.exports = {
  loginNaver: async (req, res) => {
    const state = "naver";
    
    const naverLoginUrl = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + process.env.NAVER_CLIENTID + '&redirect_uri=' + process.env.REDIRECTURL + '&state=' + state;
    res.send(naverLoginUrl);
    
  },
  loginKakao: async (req, res) => {
    const state = "kakao";
    const kakaoLoginUrl = 'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=' + process.env.KAKAO_RESTAPI + '&redirect_uri=' + process.env.REDIRECTURL + '&state=' + state;
    res.send(kakaoLoginUrl);
  },
  loginGoogle: async (req, res) => {
    res.send();
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
            nickname: naverData.nickname,
            password: naverToken
          }
        })

        const data = {
          email: naverData.email,
          nickname: naverData.nickname
        }
      
        const accessToken = makeAccessToken(data);
        const refreshToken = makeRefreshToken(data);

        res.status(200).send({
          data: { 
            user: naverData.email, 
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
              nickname: kakaoData
            },
            defaults: {
              email: 'kakaoLogin',
              password: kakaoToken
            }
          })
  
          const data = {
            email: 'kakaoLogin',
            nickname: kakaoData
          }
          console.log('hi');
          const accessToken = makeAccessToken(data);
          const refreshToken = makeRefreshToken(data);
  
          res.status(200).send({
            data: { 
              user: kakaoData, 
              accessToken: accessToken},
            message: "Oauth login success!"
        
            })}
    } catch (error) {
      res.status(500).send({ message: "server error!"})
    }
  }
}