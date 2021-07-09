'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('music', [
      {
        name: "ALONG THE RIVER",
        author: "Evert Zeevalkink",
        img: "https://oneulfile.s3.amazonaws.com/music/image/ALONG+THE+RIVER.jpeg",
        audio: "https://oneulfile.s3.amazonaws.com/music/file/ALONG+THE+RIVER.mp3",
        duration: "1:46",
        genreId: 7
      },
      {
        name: "BETTER DAYS",
        author: "Benjamin Tissot",
        img: "https://oneulfile.s3.amazonaws.com/music/image/BETTER+DAYS.jpeg",
        audio: "https://oneulfile.s3.amazonaws.com/music/file/BETTER+DAYS.mp3",
        duration: "2:34",
        genreId: 3
      },
      {
        name: "BLUE FIELDS",
        author: "StereoChipz",
        img: "https://oneulfile.s3.amazonaws.com/music/image/BLUE+FIELDS.jpeg",
        audio: "https://oneulfile.s3.amazonaws.com/music/file/BLUE+FIELDS.mp3",
        duration: "2:34",
        genreId: 7
      },
      {
        name: "CHARLIE'S MOOD",
        author: "Ponymusic",
        img: "https://oneulfile.s3.amazonaws.com/music/image/CHARLIE'S+MOOD.jpeg",
        audio: "https://oneulfile.s3.amazonaws.com/music/file/CHARLIE'S+MOOD.mp3",
        duration: "1:54",
        genreId: 1
      },
      {
        name: "CORPORATE MOTIVATIONAL",
        author: "Corporate",
        img: "https://oneulfile.s3.amazonaws.com/music/image/CORPORATE+MOTIVATIONAL.jpeg",
        audio: "https://oneulfile.s3.amazonaws.com/music/file/CORPORATE+MOTIVATIONAL.mp3",
        duration: "3:50",
        genreId: 3
      },
      {
        name: "CREEPY",
        author:  "Benjamin Tissot",
        img: "https://oneulfile.s3.amazonaws.com/music/image/CREEPY.jpeg",
        audio: "https://oneulfile.s3.amazonaws.com/music/file/CREEPY.mp3",
        duration: "3:37",
        genreId: 5
      },
      {
        name: "DON'T FORGET",
        author: "Yari",
        img: "https://oneulfile.s3.amazonaws.com/music/image/DON'T+FORGET.jpeg",
        audio: "https://oneulfile.s3.amazonaws.com/music/file/DON'T+FORGET.mp3",
        duration: "2:25",
        genreId: 1
      },
      {
        name: "E.R.F.",
        author: "Benjamin Tissot",
        img: "https://oneulfile.s3.amazonaws.com/music/image/E.R.F..jpeg",
        audio: "https://oneulfile.s3.amazonaws.com/music/file/E.R.F..mp3",
        duration: "4:41",
        genreId: 6
      },
      {
        name: "GENTLE ACOUSTIC",
        author: "Royalty",
        img: "https://oneulfile.s3.amazonaws.com/music/image/GENTLE+ACOUSTIC.jpeg",
        audio: "https://oneulfile.s3.amazonaws.com/music/file/GENTLE+ACOUSTIC.mp3",
        duration: "3:07",
        genreId: 1
      },
      {
        name: "GOOD TOGETHER",
        author: "TwinsMusic",
        img: "https://oneulfile.s3.amazonaws.com/music/image/GOOD+TOGETHER.jpeg",
        audio: "https://oneulfile.s3.amazonaws.com/music/file/GOOD+TOGETHER.mp3",
        duration: "1:53",
        genreId: 7
      },
      {
        name: "JAZZY FRENCHY",
        author: "Benjamin Tissot",
        img: "https://oneulfile.s3.amazonaws.com/music/image/JAZZY+FRENCHY.jpeg",
        audio: "https://oneulfile.s3.amazonaws.com/music/file/JAZZY+FRENCHY.mp3",
        duration:  "1:45",
        genreId: 1
      },
      {
        name: "LOVE",
        author: "Benjamin Tissot",
        img: "https://oneulfile.s3.amazonaws.com/music/image/LOVE.jpeg",
        audio: "https://oneulfile.s3.amazonaws.com/music/file/LOVE.mp3",
        duration: "5:36",
        genreId: 1
      },
      {
        name: "MOOSE",
        author: "Benjamin Tissot",
        img: "https://oneulfile.s3.amazonaws.com/music/image/MOOSE.jpeg",
        audio: "https://oneulfile.s3.amazonaws.com/music/file/MOOSE.mp3",
        duration: "2:41",
        genreId: 6
      },
      {
        name: "NICE PIANO AND UKULELE",
        author: "Royalty",
        img: "https://oneulfile.s3.amazonaws.com/music/image/NICE+PIANO+AND+UKULELE.jpeg",
        audio: "https://oneulfile.s3.amazonaws.com/music/file/NICE+PIANO+AND+UKULELE.mp3",
        duration: "2:02",
        genreId: 1
      },
      {
        name: "NOVEMBER",
        author: "Benjamin Tissot",
        img: "https://oneulfile.s3.amazonaws.com/music/image/NOVEMBER.jpeg",
        audio: "https://oneulfile.s3.amazonaws.com/music/file/NOVEMBER.mp3",
        duration: "3:32",
        genreId: 3
      },
      {
        name: "PIANO MOMENT",
        author: "Benjamin Tissot",
        img: "https://oneulfile.s3.amazonaws.com/music/image/PIANO+MOMENT.jpeg",
        audio: "https://oneulfile.s3.amazonaws.com/music/file/PIANO+MOMENT.mp3",
        duration: "1:50",
        genreId: 3
      },
      {
        name: "SCI-FI",
        author: "Benjamin Tissot",
        img: "https://oneulfile.s3.amazonaws.com/music/image/SCI-FI.jpeg",
        audio: "https://oneulfile.s3.amazonaws.com/music/file/SCI-FI.mp3",
        duration: "4:45",
        genreId: 6
      },
      {
        name: "SLOW CINEMATIC",
        author: "Royalty",
        img: "https://oneulfile.s3.amazonaws.com/music/image/SLOW+CINEMATIC.jpeg",
        audio: "https://oneulfile.s3.amazonaws.com/music/file/SLOW+CINEMATIC.mp3",
        duration: "3:27",
        genreId: 4
      },
      {
        name: "TENDERNESS",
        author: "Benjamin Tissot",
        img: "https://oneulfile.s3.amazonaws.com/music/image/TENDERNESS.jpeg",
        audio: "https://oneulfile.s3.amazonaws.com/music/file/TENDERNESS.mp3",
        duration: "2:04",
        genreId: 7
      },
      {
        name: "TOMORROW",
        author: "Benjamin Tissot",
        img: "https://oneulfile.s3.amazonaws.com/music/image/TOMORROW.jpeg",
        audio: "https://oneulfile.s3.amazonaws.com/music/file/TOMORROW.mp3",
        duration: "4:55",
        genreId: 3
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('music', null, {});
  }
};
