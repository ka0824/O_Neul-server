import { music, genre } from "../../models/index";

module.exports = {
  getList: async (req, res) => {
    try {
      const musicList = await music.findAll({
        attributes: { exclude: ["genreId"] },  
        include: {
          model: genre,
          attributes: [["genre", "genre_name"]]
        }
      })
      res.send({ music: musicList, message: "get music list success!"})
    } catch (error) {
      res.status(500).send( { message: "server error!" } )
    }
  }
}