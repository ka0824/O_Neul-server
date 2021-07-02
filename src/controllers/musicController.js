import { music, genre } from "../../models/index";

module.exports = {
  getList: async (req, res) => {
    try {
      const musicList = await music.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },  
        include: {
          model: genre,
          attributes: ["genre"]
        }
      })
      res.send({data: musicList})
    } catch (error) {
      res.status(500).send( { message: "server error!" } )
    }
  }
}