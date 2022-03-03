'use strict';
require("dotenv").config();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('diaries', [
      {
        date: "2021-7-2",
        feeling: 2,
        weather: 3,
        image: process.env.S3_DIARY_IMAGE_URL + "/1.jpeg",
        text: "오랜만에 보러 온 조조영화. 텅빈 객석에 아무도 오지 않아 결국 혼자 보게 됐다. " +
        "아침 일찍 일어나 다른 세계에 빠져 보는 건 기묘한 기분이 든다. " +
        "만약 내가 영화의 주인공이었다면 그 상황에서 어떻게 행동했을까 같은 생각에 잠겨, " +
        "영화관을 빠져나와 내 일상을 시작한다. 대부분 상상에 그치긴 하지만 평소의 내가 아닌 " +
        "영화 주인공의 방식으로 일상을 살아가다보면 그동안 보지 못했던, 느끼지 못했던 것들이 " +
        "새로 보이곤 한다. 고작 몇시간도 안되는 기억으로 남아있는 픽션의 존재가 나에게 깨달음을 준다는 "+
        "건 언제봐도 참 기묘한 일이다.",
        isPublic: true,
        userId: 1,
        musicId: 5
      },
      {
        date: "2021-7-4",
        feeling: 16,
        weather: 1,
        image: process.env.S3_DIARY_IMAGE_URL + "/2.jpeg",
        text: "찌는 듯한 더위를 맞이한 요즈음, 너무 추워 벌벌 떨었던 지난 겨울이 문득 떠올랐다. " +
        "여름엔 살이 에리듯 추웠던 겨울이, 겨울엔 몸이 녹아내릴 것 같던 여름이 그리워진다. " +
        "밤을 지새우며 고민하는 오늘 역시 언젠간 그리워질 수 있다는 걸 알기에, 너무 주저앉지 말자. " +
        "이또한, 지나가는 여름, 겨울일 뿐이다",
        isPublic: true,
        userId: 2,
        musicId: 15
      },
      {
        date: "2021-7-6",
        feeling: 8,
        weather: 1,
        image: process.env.S3_DIARY_IMAGE_URL + "/3.jpeg",
        text: "무심코 들어선 골목길에서 만난 두 친구들. 너무나도 해맑은 웃음에 나도 싱긋 미소를 지었다. " +
        "뛰어난 유머감각 없이도 미소 짓게할 수 있는 이 친구들처럼, 재밌진 않더라도 사람들을 편하게 만들 수 " + 
        "있는 그런 웃음을 가진 사람이 되고 싶다.",
        isPublic: true,
        userId: 3,
        musicId: 4
      },
      {
        date: "2021-7-9",
        feeling: 14,
        weather: 2,
        image: process.env.S3_DIARY_IMAGE_URL + "/4.jpeg",
        text: "호기롭게 길을 나서며 찍었던 사진. 불과 1시간도 안가 길을 잃고 언덕을 타고 있을 줄은 " +
        "상상도 못했다... 분명히 길을 제대로 따라 가고 있다고 생각했었는데, 못 보고 지나친 이정표가 있었나보다. " +
        "구글지도로 풀숲이 우거진 언덕을 몇번을 넘고서야 목적지에 도착할 수 있었다. 그래도 지금 되돌아보면 " +
        "다른 일행들은 보지 못했던 경치를 구경하고, 길을 찾았다는 안도감에 평소보다 몇 배는 더 행복하다. " +
        "살아가면서도 문득 내가 잘못된 선택을 했던 것이 아닐까 하는 생각이 들 때가 있다. 지금와서 되돌리기엔 " +
        "너무 늦어버린 것이 아닐까 좌절을 느끼기도 한다. 그냥 좋게 생각하자. 내가 조금 돌아왔을 지라도 " +
        "다른 사람들은 겪지 못한 경험들과, 마음의 교훈을 얻었노라고.",
        isPublic: true,
        userId: 4,
        musicId: 1
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('diaries', null, {});
  }
};
