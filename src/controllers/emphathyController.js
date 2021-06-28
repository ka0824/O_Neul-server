import { emphathy } from "../../models/index"
import { isAuthorized } from "../token/token"

module.exports = {
  add: async(req, res) => {
    const decodedToken = isAuthorized(req);  
    const diaryId = req.query.postId;
    
    try {
      await emphathy.create({
        userId: decodedToken.id,
        diaryId: diaryId,
        diary_id: diaryId
      })

      res.status(201).send({
        data: {
          dairyId: diaryId,
        },
        message: "add emphathy success!"
      })
    } catch (error) {
      res.status(500).send({ message: "server error!" })
    }
  },
  delete: async(req, res) => {
    const decodedToken = isAuthorized(req);  
    const diaryId = req.query.postId;
    
    try {
      await emphathy.destroy({
        where: {
          diaryId: diaryId,
          userId: decodedToken.id
        }
      })
      res.status(200).send({
        data: {
          diaryId: diaryId
        },
        message: "delete emphathy success!"
      })
    } catch (error) {
      res.status(500).send({ message: "server error!" })
    }
  }
}