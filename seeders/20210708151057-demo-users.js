'use strict';
require("dotenv").config();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        email: "test1@test.com",
        password: "$2b$10$UTpcqo7fur00Yd9NQHkP3u3TDyPvQpj19ZhLJzpr96.7BYa1M8sKe",
        nickname: "김코딩",
        picture: process.env.S3_PROFILE_URL + "/test1.png",
        isSocialLogin: false,
      },
      {
        email: "test2@test.com",
        password: "$2b$10$UTpcqo7fur00Yd9NQHkP3u3TDyPvQpj19ZhLJzpr96.7BYa1M8sKe",
        nickname: "강버그",
        picture: process.env.S3_PROFILE_URL + "/test2.png",
        isSocialLogin: false,
      },
      {
        email: "test3@test.com",
        password: "$2b$10$UTpcqo7fur00Yd9NQHkP3u3TDyPvQpj19ZhLJzpr96.7BYa1M8sKe",
        nickname: "최변수",
        picture: process.env.S3_PROFILE_URL + "/test3.png",
        isSocialLogin: false,
      },
      {
        email: "test4@test.com",
        password: "$2b$10$UTpcqo7fur00Yd9NQHkP3u3TDyPvQpj19ZhLJzpr96.7BYa1M8sKe",
        nickname: "나서버",
        picture: process.env.S3_PROFILE_URL + "/test4.png",
        isSocialLogin: false,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
