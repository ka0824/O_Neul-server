import { emphathy } from "../../models/index"
import { isAuthorized } from "../token/token"

module.exports = {
  add: async(req, res) => {
    const decodedToken = isAuthorized(req);  
    const diaryId = req.body.diaryId;
    try {
      const emphathyData =  await emphathy.create({
        userId: decodedToken.id,
        diaryId: diaryId
      }).then((res) => {return res.dataValues});
      res.status(201).send({
        data: {
          emphathy: {
            id: emphathyData.id
          }
        },
        message: "add emphathy success!"
      })
    } catch (error) {
      res.status(500).send({ message: "server error!" })
    }
  },
  delete: async(req, res) => {
    const decodedToken = isAuthorized(req);  
    const diaryId = req.body.diaryId;
    
    try {
      const emphathyData = await emphathy.findOne({
        where: {userId: decodedToken.id, diaryId: diaryId}
      }).then(res => {return res.dataValues});

      await emphathy.destroy({
        where: {
          diaryId: diaryId,
          userId: decodedToken.id
        }
      })
      res.status(200).send({
        data: {
          emphathy: {
            id: emphathyData.id
          }
        },
        message: "delete emphathy success!"
      })
    } catch (error) {
      res.status(500).send({ message: "server error!" })
    }
  }
}