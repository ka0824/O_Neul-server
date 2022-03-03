import { diary, emphathy, music, user, genre } from "../../models/index"
import { isAuthorized } from "../token/token";
import { findMyDiary, findPublicDiary, findMusicList } from "../util/sequelizeFuncs";

module.exports = {
  getDiarys: async (req, res) => {
    const decodedToken = isAuthorized(req);
    try {
      if (!decodedToken) {
        const publicDiary = await findPublicDiary();
        const musicList = await findMusicList();

        res.status(200).send({
          data: 
          {
            publicDiary,
            musicList
          },
          message: "get main info success(not login)"
        })
      } else {
        const publicDiary = await findPublicDiary();
        const myDiary = await findMyDiary(decodedToken.id);
        const musicList = await findMusicList();
        
        console.log("hi");
        res.status(200).send({
          data: {
            publicDiary,
            myDiary,
            musicList
          },
          message: "get main info success!(loggined)"
        })
      }
        
    } catch (error) {
      res.status(500).send({ message: "server error!" })
    }
  }
}