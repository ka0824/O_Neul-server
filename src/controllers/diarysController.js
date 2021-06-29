import { diary, emphathy, music } from "../../models/index"
import { isAuthorized } from "../token/token"

module.exports = {
  getDiarys: async (req, res) => {
    try {
        const diaryData = await diary.findAll({
          include: [
             {
               model: user,
               attributes: ['nickname']
             },
             {
               model: music,
               attributes: ['title', 'path']
             },
             {
               model: emphathy,
               include: [{
                 model: user,
                 attributes: ['nickname']
               }]
             }
          ],
          where: { isPublic: true }        
        }).then(res => {return res.dataValues})

        res.status(200).send({
          data: diaryData,
          message: "success!"
        })

    } catch (error) {
      res.status(500).send({ message: "server error!" })
    }
  }
}