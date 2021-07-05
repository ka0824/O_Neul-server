import "dotenv/config"
import axios from "axios";

module.exports = {
  makeSocialUrl: (siteName) => {
    if (siteName === "naver") {
      return ('https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' 
        + process.env.NAVER_CLIENTID + '&redirect_uri=' + process.env.REDIRECTURL + '&state=naver');
    } else if (siteName === "kakao") {
      return ('https://kauth.kakao.com/oauth/authorize?response_type=code&client_id='
        + process.env.KAKAO_RESTAPI + '&redirect_uri=' + process.env.REDIRECTURL + '&state=kakao');
    } else if (siteName === "google") {
      return ('https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id='
        + process.env.GOOGLE_CLIENTID + '&redirect_uri=' + process.env.REDIRECTURL + '&state=google&scope=email%20profile');
    }
  },
  getSocialInfo: async(code, state) => {
    if (state === 'naver') {
      const naverTokenUrl = ('https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='
        + process.env.NAVER_CLIENTID + '&client_secret=' + process.env.NAVER_SECRET + '&redirect_uri=' + process.env.REDIRECTURL + '&code=' + code + '&state=' + state)
      const naverToken = await axios.get(naverTokenUrl)
         .then(res => {return res.data.access_token})

      const header = "Bearer " + naverToken;
      
      return await axios.get("https://openapi.naver.com/v1/nid/me",
        {headers: {'Authorization': header}})
         .then((res) => {return {email: res.data.response.email, nickname: res.data.response.nickname}})
   
      } else if (state === 'kakao') {
        const kakaoTokenUrl = ('https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id='
         + process.env.KAKAO_RESTAPI + '&redirect_uri=' + process.env.REDIRECTURL + '&code=' + code);
        const kakaoToken = await axios.get(kakaoTokenUrl)
          .then(res => {return res.data.access_token})
        
        const header = "Bearer " + kakaoToken;
        
        return await axios.get("https://kapi.kakao.com/v2/user/me",
         {headers: {'Authorization': header}})
          .then((res) => {return res.data.kakao_account.profile.nickname})
    
      } else if (state === 'google') {
        const googleTokenUrl = 'https://accounts.google.com/o/oauth2/token?grant_type=authorization_code&client_id=' + process.env.GOOGLE_CLIENTID + '&redirect_uri=' + process.env.REDIRECTURL + '&client_secret=' + process.env.GOOGLE_SECRET + '&code=' + code;
        const googleToken = await axios.post(googleTokenUrl)
          .then(res => {return res.data});
        
        const header = "Bearer " + googleToken.access_token; 

        return await axios.get("https://oauth2.googleapis.com/tokeninfo",
          {
            params: { id_token: googleToken.id_token },
            headers: {'Authorization': header}
          })
            .then(res => {return res.data.email});
    }
  }
}