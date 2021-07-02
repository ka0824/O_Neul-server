import { diary, emphathy, music, user } from "../../models/index"
import { isAuthorized } from "../token/token"
import { Op } from "sequelize";

module.exports = {
  getDiarys: async (req, res) => {
    try {
        const decodedToken = isAuthorized(req)
        if(!decodedToken) {
          const othersDiary = await diary.findAll({
            attributes: { exclude: ["createdAt", "updatedAt", "userId", "musicId"] },
            include: [
               {
                 model: user,
                 attributes: ['id' ,"nickname"],
               },
               {
                 model: music,
                 attributes: ['id' ,'title', 'path', 'duration']
               },
               {
                 model: emphathy,
                 attributes: ['id'],
                 required: true,
                 include: {
                   model: user,
                   required: true,
                   attributes: ['nickname'],
                   
                }
               }
            ],
            where: { isPublic: true }        
          });
        res.status(200).send({
          data: {
            othersDiary,
            myDiary: []
          },
          message: "get diary success (not loggined)"
        })
        
        } else {
          const { nickname } = decodedToken;
          
          const id = await user.findOne({ where: {nickname: nickname} })
            .then(res => {return res.dataValues.id})

          const myDiary = await diary.findAll({
            attributes: { exclude: ["createdAt", "updatedAt", "userId", "musicId"] },
            include: [
               {
                 model: user,
                 attributes: ['id' ,"nickname"],
               },
               {
                 model: music,
                 attributes: ['id' ,'title', 'path', 'duration']
               },
               {
                 model: emphathy,
                 attributes: ['id'],
                 required: true,
                 include: {
                   model: user,
                   required: true,
                   attributes: ['nickname'],                   
                }
               }
            ],
            where: { userId: id }        
          })

          const othersDiary = await diary.findAll({
            attributes: { exclude: ["createdAt", "updatedAt", "userId", "musicId"] },
            include: [
               {
                 model: user,
                 attributes: ['id' ,"nickname"],
               },
               {
                 model: music,
                 attributes: ['id' ,'title', 'path', 'duration']
               },
               {
                 model: emphathy,
                 attributes: ['id'],
                 required: true,
                 include: {
                   model: user,
                   required: true,
                   attributes: ['nickname'],
                   
                }
               }
            ],
            where: { userId: {[Op.not]: id}, isPublic: true }     
          });
        
        res.status(200).send({
          data: {
            othersDiary,
            myDiary
          },
          message: "get Diary success! (loggined)"
          })  
        }      
    } catch (error) {
      res.status(500).send({ message: "server error!" })
    }
  }
}