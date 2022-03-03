import { diary, user, music, emphathy, genre } from "../../models/index"; 
import { findUser, findDiary, findMusic } from "../util/sequelizeFuncs"
import { isAuthorized } from "../token/token"

module.exports = {
  write: async(req, res) => {
    const decodedToken = isAuthorized(req);
    try {
      if (!decodedToken) {
        res.status(401).send( {message: "You have to signIn" });
      } else { 
        const { musicId, isPublic, date, feeling, weather, image, text } = req.body;
        
        const userInfo = await findUser(decodedToken.id);
        const musicInfo = await findMusic(musicId);

        const postedDiary = await diary.create({
          date: date,
          feeling: feeling,
          weather: weather,
          image: image,
          text: text,
          isPublic: isPublic,
          userId: userInfo.id,
          musicId: musicInfo.id
        }).then(res => {return res.dataValues});

        console.log(postedDiary);

        res.status(201).send({
          data: {
            ...postedDiary,
            userId: undefined,
            musicId: undefined,
            user: {
              id: userInfo.id,
              nickname: userInfo.nickname,
              picture: userInfo.picture
            },
            music: {
              ...musicInfo
            },
            emphathies: []
            },
            message: "write diary success!"
          });
        }
    } catch (error) {
        res.status(500).send({ message: "server error!" })
    }
  },
  delete: async(req, res) => {
    const decodedToken = isAuthorized(req);
    try {
      if (!decodedToken) {
        res.status(401).send( {message: "You have to signIn" });
      } else {
        const diaryId = req.body.diaryId
        await diary.destroy({
          where: {
            id: diaryId
          }
        })

        res.status(200).send({
          diary: { id: diaryId},
          message: "delete post success!"});
      }
    } catch (error) {
      res.status(500).send({ message: "server error!" })
    }
  },
  edit: async(req, res) => {
    try {
      const decodedToken = isAuthorized(req);

      const {diaryId, musicId, isPublic, date, feeling, weather, image, text } = req.body;
      
      const userInfo = findUser(decodedToken.id)
      const musicInfo = findMusic(musicId);
      
      await diary.update(
        {
          ...req.body,
          music: musicId
        },
        { where: { id: diaryId }}
      );
      
      const updatedDiary = await findDiary(diaryId);

      res.status(201).send({
        data: {...updatedDiary},
        message: "edit diary success!"
      })

    } catch (error) {
      res.status(500).send({ message: "server error!" })
    }
  },
  get: async(req, res) => {
    try {
      const diaryId = req.query.diaryId;

      const selectedDiary = await findDiary(diaryId);
      res.status(200).send({
        data: {
          diary: {...selectedDiary}
        }
      })
    } catch (error) {
      res.status(500).send({ message: "server error!" })
    }
  }
}