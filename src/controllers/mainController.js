import { diary, emphathy, music, user, genre } from "../../models/index"

module.exports = {
  getDiarys: async (req, res) => {
    try {
      const publicDiary = await diary.findAll({
        attributes: { exclude: ["userId", "musicId"] },
        include: [
          {
            model: user,
            attributes: ['id' ,"nickname"],
          },
          {
            model: music,
            attributes: { exclude: ["genreId"] },
            include: {
              model: genre,
              attributes: [["genre", "genre_name"]]
            }
          },
          {
            model: emphathy,
            attributes: ['id'],
            required: false,
              include: {
              model: user,
              required: true,
              attributes: ['id', 'nickname']     
              }
            }
          ],
            where: { isPublic: true }        
          });

        res.status(200).send({
          data: {
            publicDiary: [...publicDiary]
          },
          message: "get public diary success!"
        })
        
    } catch (error) {
      res.status(500).send({ message: "server error!" })
    }
  }
}