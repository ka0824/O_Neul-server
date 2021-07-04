import "dotenv/config"
import { user, diary, music, genre, emphathy } from "../../models/index"
import { makeAccessToken,makeRefreshToken, isAuthorized, renewAccessToken } from "../token/token"
import bcrypt from "bcrypt";

module.exports = {
  signIn: async(req, res) => {
    const { email, password } = req.body
    try { 
      const isValid = await user.findOne({ where: { email } });
      if (!isValid) {
        res.status(401).send({ message: "invalid email!"})
      } else if (bcrypt.compareSync(password, isValid.dataValues.password) === false) {
        res.status(401).send({ message: "password error!" })
      } else {
        const allData = isValid.dataValues;
        const { password, ...someData } = allData;

        const myDiary = await diary.findAll({
          attributes: { exclude: ["musicId", "userId"] },
          include: [
            {
              model: user,
              attributes: ["id", "nickname"]
            },
            {
              model: music,
              attributes: { exclude: ["genreId"] },
              include: {
                model: genre,
                attributes: [["genre", "genre_name"]],
              }
            },
            {
              model: emphathy,
              attributes: ["id"],
              required: false,
              include: {
                model: user,
                attributes: ["id", "nickname"]
              }
            }
          ],
          where: {
            userId: someData.id
          }
        });

        const accessToken = makeAccessToken(someData);
        const refreshToken = makeRefreshToken(someData);

        res.cookie("refreshToken", refreshToken, { httpOnly: true });
         
        res.status(200).send({
          data: { user: someData, accessToken, myDiary },
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
        const hashedPassword = await bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS));
        const data = await user.create({
          email,
          password: hashedPassword,
          nickname,
          picture: "https://oneulfile.s3.amazonaws.com/profile/default.jpeg",
          isSocialLogin: false          
        }).then(res => { return res.dataValues });
       
        ['password'].map(field => { delete data[field] });
        
        res.status(201).send({ data: { user: data }, message: "signUp success!" });
      }
    } catch (error) {
      res.status(500).send({message: "server error!"});
    }
  },
  edit: async(req, res) => {
    const decodedToken = await isAuthorized(req);
    const { password, nickname } = req.body;
    
    try {
      if (!decodedToken) {
        res.status(401).send( {message: "You have to signIn" });
      } else {
        const isExisted = await user.findOne({ where: { nickname: nickname} });
        const hashedPassword = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS));

        if (!isExisted) {
          await user.update({ password: hashedPassword, nickname }, {where: { id: decodedToken.id }});
          const updatedInfo = { ...decodedToken, password: hashedPassword, nickname }
          const { iat, exp, password, ...filteredInfo } = updatedInfo; 
          console.log(filteredInfo);

          const accessToken = makeAccessToken(filteredInfo);
          const refreshToken = makeRefreshToken(filteredInfo);

          res.cookie("refreshToken", refreshToken, { httpOnly: true });
         
          res.status(200).send({
            data: { user: {...filteredInfo}, accessToken },
            message: "edit userInfo success!"
          });
        } else {
          if(isExisted.dataValues.email !== decodedToken.email) {
            res.status(409).send({ message: "nickname alredy existed!"})
          }
          await user.update({ password: hashedPassword, nickname }, {where: { id: decodedToken.id }});
          const updatedInfo = { ...decodedToken, password: hashedPassword, nickname }
          const { iat, exp, password, ...filteredInfo } = updatedInfo; 
          console.log(filteredInfo);

          const accessToken = makeAccessToken(filteredInfo);
          const refreshToken = makeRefreshToken(filteredInfo);

          res.cookie("refreshToken", refreshToken, { httpOnly: true });
         
          res.status(200).send({
            data: { user: {...filteredInfo}, accessToken },
            message: "edit userInfo success!"
          });
        }
      }     
    } catch (error) {
      res.status(500).send({ message: "sever error!"})
    }
  },
  renewToken: async (req, res) => {
    try {
      const isValidRefreshToken = renewAccessToken(req);
      
      if (isValidRefreshToken === null) {
        res.status(401).send({ message: "You have to login" })
      } else {
        
        const data = { ...isValidRefreshToken };
        const { iat, exp, ...filteredData } = data
        const accessToken = makeAccessToken(filteredData);
        console.log(filteredData);

        res.status(200).send({
          data: { user: { ...filteredData }, accessToken}, 
          message: "get new access token success!"
        });
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

        const myDiary = await diary.findAll({
          attributes: { exclude: ["musicId", "userId"] },
          include: [
            {
              model: user,
              attributes: ["id", "nickname"]
            },
            {
              model: music,
              attributes: { exclude: ["genreId"] },
              include: {
                model: genre,
                attributes: [["genre", "genre_name"]],
              }
            },
            {
              model: emphathy,
              attributes: ["id"],
              required: false,
              include: {
                model: user,
                attributes: ["id", "nickname"]
              }
            }
          ],
          where: {
            userId: decodedToken.id
          }
        });

        const { exp, iat, ...someData } = decodedToken;

        res.status(200).send( {
          data: {
            user: {
              ...someData
            },
            myDiary           
          },
          message: "getUserInfo success!"
        })
      }
    } catch (error) {
      res.status(500).send( { message: "server error!" })
    }
  },
  signOut: async (req, res) => {
    try {
      const isValidRefreshToken = renewAccessToken(req);
      
      if (isValidRefreshToken === null) {
        res.status(401).send({ message: "You have to login" })
      } else {
        
        res.status(205).clearCookie('refreshToken').send("logout success!")
        
      }
    } catch (error) {
      res.status(500).send( { message: "server error!" })
    }
  }
}