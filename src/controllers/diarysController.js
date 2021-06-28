import { diary, emphathy, music } from "../../models/index"
import { isAuthorized } from "../token/token"

module.exports = {
  getDiarys: async (req, res) => {
    try {
      const isAuthorized = isAuthorized(req);
      if (!isAuthorized) {

        diary.findAll({
          include: [
             {
               model: user,
               attributes: ['nickname']
             },
             {
               model: music,
               attributes: ['title', 'path']
             }
          ],
          where: { isPublic: true }        
        }).then(res => {return res.dataValues})


        res.status(200).send({
          data: {

          },
          message: "you are not loggined"
        });
      } else {


        res.status(200).send({
          data: {
  
          },
          message: "success"
        });
     }
    } catch (error) {
      res.status(500).send({ message: "server error!" })
    }
  }
}