import { diary, user, music, emphathy } from "../../models/index"; 
import { isAuthorized } from "../token/token"

module.exports = {
  write: async(req, res) => {
    try {
      const { music, isPublic, date, feeling, weather, image, text } = req.body;
      const decodedToken = isAuthorized(req);
    
      const userIdData = await user.findOne({
        where: {
          nickname: decodedToken.nickname
        }
      }).then(res => {return res.dataValues});
      
    
      const musicIdData = await music.findOne({
        where: {
          title: music
        }
      }).then(res => {return res.dataValues});

      const postedDiary = await diary.create({
        date: date,
        feeling: feeling,
        weather: weather,
        image: image,
        text: text,
        isPublic: isPublic,
       userId: userIdData.id,
       musicId: musicIdData.id
      }).then(res => {return res.dataValues});

      res.status(201).send({
        data: {
         id: postedDiary.id,
           date: date,
           feeling: feeling,
           weather: weather,
           image: image,
           text: text,
           isPublic: isPublic,
           user: {
           nickname: userIdData.nickname
         },
         music: {
           path: musicIdData.path,
           title: musicIdData.title
         },
         emphathy: []
        },
        message: "write post success!"
      })
    } catch (error) {
        res.status(500).send({ message: "server error!" })
    }
  },
  delete: async(req, res) => {
    try {
      const decodedToken = isAuthorized(req);
      const postId = req.query.postId

      await diary.destroy({
        where: {
          id: postId
        }
      })

      res.status(200).send({ message: "delete post success!"});
    } catch (error) {
      res.status(500).send({ message: "server error!" })
    }
  },
  edit: async(req, res) => {
    try {
      const decodedToken = isAuthorized(req);
      const postId = req.query.postId

      const { music, isPublic, date, feeling, weather, image, text } = req.body;

      const userIdData = await user.findOne({
        where: {
          nickname: decodedToken.nickname
        }
      }).then(res => { return res.dataValues });
    
      const musicIdData = await music.findOne({
        where: {
          title: musicId
        }
      }).then(res => { return res.dataValues });

      const emphathyArray = [];

      emphathy.findAll({
        include: [
           {
             model: user,
             attributes: ['nickname']
           }
        ],
        where: { postId: postId }        
      }).then(res => {return res.dataValues})
        .then(data => data.map(emphathy => emphathyArray.push(emphathy.nickname)))

      const postedDiaryData = await diary.update(
        {
          where: {
            id: postId
          }
        }
        , {
          date: date,
          feeling: feeling,
          weather: weather,
          image: image,
          text: text,
          isPublic: isPublic,
          userId: userIdData.id,
          musicId: musicIdData.id
      }).then(res => {return res.dataValues});

      res.status(201).send({
        data: {
          id: postedDiaryData.id,
            date: date,
            feeling: feeling,
            weather: weather,
            image: image,
            text: text,
            isPublic: isPublic,
            user: {
            nickname: userIdData.nickname
          },
          music: {
            path: musicIdData.path,
            title: musicIdData.title
          },
          emphathy: emphathyArray
         },
        message: "edit post success!"
      })

    } catch (error) {
      res.status(500).send({ message: "server error!" })
    }
  }
}