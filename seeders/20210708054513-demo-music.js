'use strict';
require("dotenv").config();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('music', [
      // { 
      //   id:0,
      //   name: "ALONG THE RIVER",
      //   author: "Evert Zeevalkink",
      //   img: process.env.S3_MUSIC_IMAGE_URL + "/ALONG+THE+RIVER.jpeg",
      //   audio: process.env.S3_MUSCI_FILE_URL  + "/ALONG+THE+RIVER.mp3",
      //   duration: "1:46",
      //   genreId: 7
      // },
      {
        name: "BETTER DAYS",
        author: "Benjamin Tissot",
        img: process.env.S3_MUSIC_IMAGE_URL + "/BETTER+DAYS.jpeg",
        audio: process.env.S3_MUSCI_FILE_URL + "/BETTER+DAYS.mp3",
        duration: "2:34",
        genreId: 3
      },
      {
        name: "BLUE FIELDS",
        author: "StereoChipz",
        img: process.env.S3_MUSIC_IMAGE_URL + "/BLUE+FIELDS.jpeg",
        audio: process.env.S3_MUSCI_FILE_URL + "/BLUE+FIELDS.mp3",
        duration: "2:34",
        genreId: 7
      },
      {
        name: "CHARLIE'S MOOD",
        author: "Ponymusic",
        img: process.env.S3_MUSIC_IMAGE_URL + "/CHARLIE'S+MOOD.jpeg",
        audio: process.env.S3_MUSCI_FILE_URL + "/CHARLIE'S+MOOD.mp3",
        duration: "1:54",
        genreId: 1
      },
      {
        name: "CORPORATE MOTIVATIONAL",
        author: "Corporate",
        img: process.env.S3_MUSIC_IMAGE_URL + "/CORPORATE+MOTIVATIONAL.jpeg",
        audio: process.env.S3_MUSCI_FILE_URL + "/CORPORATE+MOTIVATIONAL.mp3",
        duration: "3:50",
        genreId: 3
      },
      {
        name: "CREEPY",
        author:  "Benjamin Tissot",
        img: process.env.S3_MUSIC_IMAGE_URL + "/CREEPY.jpeg",
        audio: process.env.S3_MUSCI_FILE_URL + "/CREEPY.mp3",
        duration: "3:37",
        genreId: 5
      },
      {
        name: "DON'T FORGET",
        author: "Yari",
        img: process.env.S3_MUSIC_IMAGE_URL + "/DON'T+FORGET.jpeg",
        audio: process.env.S3_MUSCI_FILE_URL + "/DON'T+FORGET.mp3",
        duration: "2:25",
        genreId: 1
      },
      {
        name: "E.R.F.",
        author: "Benjamin Tissot",
        img: process.env.S3_MUSIC_IMAGE_URL + "/E.R.F..jpeg",
        audio: process.env.S3_MUSCI_FILE_URL + "/E.R.F..mp3",
        duration: "4:41",
        genreId: 6
      },
      {
        name: "GENTLE ACOUSTIC",
        author: "Royalty",
        img: process.env.S3_MUSIC_IMAGE_URL + "/GENTLE+ACOUSTIC.jpeg",
        audio: process.env.S3_MUSCI_FILE_URL + "/GENTLE+ACOUSTIC.mp3",
        duration: "3:07",
        genreId: 1
      },
      {
        name: "GOOD TOGETHER",
        author: "TwinsMusic",
        img: process.env.S3_MUSIC_IMAGE_URL + "/GOOD+TOGETHER.jpeg",
        audio: process.env.S3_MUSCI_FILE_URL + "/GOOD+TOGETHER.mp3",
        duration: "1:53",
        genreId: 7
      },
      {
        name: "JAZZY FRENCHY",
        author: "Benjamin Tissot",
        img: process.env.S3_MUSIC_IMAGE_URL + "/JAZZY+FRENCHY.jpeg",
        audio: process.env.S3_MUSCI_FILE_URL + "/JAZZY+FRENCHY.mp3",
        duration:  "1:45",
        genreId: 1
      },
      {
        name: "LOVE",
        author: "Benjamin Tissot",
        img: process.env.S3_MUSIC_IMAGE_URL + "/LOVE.jpeg",
        audio: process.env.S3_MUSCI_FILE_URL + "/LOVE.mp3",
        duration: "5:36",
        genreId: 1
      },
      {
        name: "MOOSE",
        author: "Benjamin Tissot",
        img: process.env.S3_MUSIC_IMAGE_URL + "/MOOSE.jpeg",
        audio: process.env.S3_MUSCI_FILE_URL + "/MOOSE.mp3",
        duration: "2:41",
        genreId: 6
      },
      {
        name: "NICE PIANO AND UKULELE",
        author: "Royalty",
        img: process.env.S3_MUSIC_IMAGE_URL + "/NICE+PIANO+AND+UKULELE.jpeg",
        audio: process.env.S3_MUSCI_FILE_URL + "/NICE+PIANO+AND+UKULELE.mp3",
        duration: "2:02",
        genreId: 1
      },
      {
        name: "NOVEMBER",
        author: "Benjamin Tissot",
        img: process.env.S3_MUSIC_IMAGE_URL + "/NOVEMBER.jpeg",
        audio: process.env.S3_MUSCI_FILE_URL + "/NOVEMBER.mp3",
        duration: "3:32",
        genreId: 3
      },
      {
        name: "PIANO MOMENT",
        author: "Benjamin Tissot",
        img: process.env.S3_MUSIC_IMAGE_URL + "/PIANO+MOMENT.jpeg",
        audio: process.env.S3_MUSCI_FILE_URL + "/PIANO+MOMENT.mp3",
        duration: "1:50",
        genreId: 3
      },
      {
        name: "SCI-FI",
        author: "Benjamin Tissot",
        img: process.env.S3_MUSIC_IMAGE_URL + "/SCI-FI.jpeg",
        audio: process.env.S3_MUSCI_FILE_URL + "/SCI-FI.mp3",
        duration: "4:45",
        genreId: 6
      },
      {
        name: "SLOW CINEMATIC",
        author: "Royalty",
        img: process.env.S3_MUSIC_IMAGE_URL + "/SLOW+CINEMATIC.jpeg",
        audio: process.env.S3_MUSCI_FILE_URL + "/SLOW+CINEMATIC.mp3",
        duration: "3:27",
        genreId: 4
      },
      {
        name: "TENDERNESS",
        author: "Benjamin Tissot",
        img: process.env.S3_MUSIC_IMAGE_URL + "/TENDERNESS.jpeg",
        audio: process.env.S3_MUSCI_FILE_URL + "/TENDERNESS.mp3",
        duration: "2:04",
        genreId: 7
      },
      {
        name: "TOMORROW",
        author: "Benjamin Tissot",
        img: process.env.S3_MUSIC_IMAGE_URL + "/TOMORROW.jpeg",
        audio: process.env.S3_MUSCI_FILE_URL + "/TOMORROW.mp3",
        duration: "4:55",
        genreId: 3
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('music', null, {});
  }
};
