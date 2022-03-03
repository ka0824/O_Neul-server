import { async } from "regenerator-runtime"
import { diary, emphathy, genre, music, user } from "../../models/index"

module.exports = {
  findUser: async(userId) => {
    return await user.findOne({ where: {id: userId} })
      .then(res => { return res.dataValues });
  },
  findMusic: async(musicId) => {
    return await music.findOne({ 
      where: {id: musicId},
      include: {
        model: genre,
        attributes: [["genre", "genre_name"]]
      },
      attributes: { exclude: ["genreId"] }
    })
      .then(res => { return res.dataValues });
  },
  findMyDiary: async(userId) => {
    return await diary.findAll({
      attributes: { exclude: ["musicId", "userId"] },
      include: [
        {
          model: user,
          attributes: ["id", "nickname", "picture"]
        },
        {
          model: music,
          attributes: { exclude: ["genreId"] },
          include: {
            model: genre,
            attributes: [["genre", "genre_name"]],
          }
        },
        {
          model: emphathy,
          as: "emphathies",
          attributes: ["id"],
          required: false,
          include: {
            model: user,
            attributes: ["id", "nickname"]
          }
        }
      ],
      where: {
        userId: userId
      }
    });
  },
  findDiary: async (diaryId) => {
    return await diary.findOne({
      attributes: { exclude: ["musicId", "userId"] },
      include: [
        {
          model: user,
          attributes: ["id", "nickname", "picture"]
        },
        {
          model: music,
          attributes: { exclude: ["genreId"] },
          include: {
            model: genre,
            attributes: [["genre", "genre_name"]],
          }
        },
        {
          model: emphathy,
          as: "emphathies",
          attributes: ["id"],
          required: false,
          include: {
            model: user,
            attributes: ["id", "nickname"]
          }
        }
      ],
      where: {
        id: diaryId
      }
    }).then(res => {return res.dataValues});
  },
  findMyEmphathy: async (userId) => {
    return await emphathy.findAll({
      where: { userId: userId },
      attributes: { exclude: ["userId", "diaryId"] },
      include: {
        model: diary,
        attributes: { exclude: ["userId", "musicId"] },
        include: [
          {
            model: user,
            attributes: ["nickname", "id", "picture"]
          }, {
            model: music,
            attributes: { exclude: ["genreId"] },
            include: {
              model: genre,
              attributes: { exclude: ["id"] }
            }
          }, 
          {
            model: emphathy,
            as: "emphathies",
            attributes: ["id"],
            required: false,
            include: {
              model: user,
              attributes: ["id", "nickname"]
            }
          }
        ]
      }
    })
  },
  findPublicDiary: async () => {
    return await diary.findAll({
      attributes: { exclude: ["userId", "musicId"] },
      include: [
        {
          model: user,
          attributes: ['id' ,"nickname", "picture"],
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
          as: "emphathies",
          attributes: ['id'],
          required: false,
            include: {
              model: user,
              attributes: ['id', 'nickname']     
            }
          }
        ],
          where: { isPublic: true }        
        });
  },
  findMusicList: async () => {
    return await music.findAll({
      attributes: { exclude: ["genreId"] },  
      include: {
        model: genre,
        attributes: [["genre", "genre_name"]]
      }
    });
  }

}