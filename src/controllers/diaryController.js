import { async } from "regenerator-runtime";
import { diary, user, music, emphathy, genre } from "../../models/index"; 
import { isAuthorized } from "../token/token"

module.exports = {
  write: async(req, res) => {
    const decodedToken = isAuthorized(req);
    try {
      if (!decodedToken) {
        res.status(401).send( {message: "You have to signIn" });
      } else { 
        const { musicName, isPublic, date, feeling, weather, image, text } = req.body;
        const userIdData = await user.findOne({
          where: {
            nickname: decodedToken.nickname
          }
        }).then(res => {return res.dataValues});
     
        const musicIdData = await music.findOne({
          where: {
            name: musicName
          },
          include: {
            model: genre,
            attributes: [["genre", "genre_name"]]
          },
          attributes: { exclude: ["genreId"] }
        }).then(res => {return res.dataValues});

        const postedDiary = await diary.create({
          date: date,
          feeling: feeling,
          weather: weather,
          image: image,
          text: text,
          isPublic: isPublic,
          userId: decodedToken.id,
          musicId: musicIdData.id
        }).then(res => {return res.dataValues});

        res.status(201).send({
          data: {
            ...postedDiary,
            userId: undefined,
            musicId: undefined,
            user: {
            id: userIdData.id,
            nickname: userIdData.nickname
            },
            music: {
              ...musicIdData
            },
            emphathy: []
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
        const diaryId = req.query.diaryId
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
      const diaryId = req.query.diaryId

      const { musicName, isPublic, date, feeling, weather, image, text } = req.body;

      const userIdData = await user.findOne({
        where: {
          nickname: decodedToken.nickname
        }
      }).then(res => { return res.dataValues });
    
      const musicIdData = await music.findOne({
        where: {
          name: musicName
        }
      }).then(res => { return res.dataValues });
      
      await diary.update(
        {
          date: date,
          feeling: feeling,
          weather: weather,
          image: image,
          text: text,
          isPublic: isPublic,
          userId: userIdData.id,
          musicId: musicIdData.id
        },
        { where: { id: diaryId }}
      );
      
      const updatedDiary = await diary.findOne({
        where: { id: diaryId },
        include: [
          {
            model: user,
            attributes: ["id", "nickname"]
          },
          {
            model: music,
            attributes: { exclude: ["genreId"]},
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
              attributes: ['nickname']
           }
          }
        ],
        attributes: { exclude: ["userId", "musicId"] }
      }).then(res => {return res.dataValues});

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

      const selectedDiary = await diary.findOne({
        where: { id: diaryId },
        include: [
          {
            model: user,
            attributes: ["id", "nickname"]
          },
          {
            model: music,
            attributes: { exclude: ["genreId"]},
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
              attributes: ['nickname']
            }
          }
        ],
        attributes: { exclude: ["userId", "musicId"] }
      }).then(res => {return res.dataValues});

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