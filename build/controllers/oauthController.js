"use strict";

require("dotenv/config");

var _axios = _interopRequireDefault(require("axios"));

var _index = require("../../models/index");

var _token = require("../token/token");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

module.exports = {
  loginNaver: function () {
    var _loginNaver = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var state, naverLoginUrl;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              state = "naver";
              naverLoginUrl = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + process.env.NAVER_CLIENTID + '&redirect_uri=' + process.env.REDIRECTURL + '&state=' + state;
              res.send(naverLoginUrl);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function loginNaver(_x, _x2) {
      return _loginNaver.apply(this, arguments);
    }

    return loginNaver;
  }(),
  loginKakao: function () {
    var _loginKakao = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      var state, kakaoLoginUrl;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              state = "kakao";
              kakaoLoginUrl = 'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=' + process.env.KAKAO_RESTAPI + '&redirect_uri=' + process.env.REDIRECTURL + '&state=' + state;
              res.send(kakaoLoginUrl);

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function loginKakao(_x3, _x4) {
      return _loginKakao.apply(this, arguments);
    }

    return loginKakao;
  }(),
  loginGoogle: function () {
    var _loginGoogle = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              res.send();

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function loginGoogle(_x5, _x6) {
      return _loginGoogle.apply(this, arguments);
    }

    return loginGoogle;
  }(),
  loginCallback: function () {
    var _loginCallback = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
      var _req$body, code, state, naverTokenUrl, naverToken, header, naverData, data, accessToken, refreshToken, kakaoTokenUrl, kakaoToken, _header, kakaoData, _data, _accessToken, _refreshToken;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _req$body = req.body, code = _req$body.code, state = _req$body.state;

              if (!(state === "naver")) {
                _context4.next = 19;
                break;
              }

              naverTokenUrl = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=' + process.env.NAVER_CLIENTID + '&client_secret=' + process.env.NAVER_SECRET + '&redirect_uri=' + process.env.REDIRECTURL + '&code=' + code + '&state=' + state;
              _context4.next = 6;
              return _axios["default"].get(naverTokenUrl).then(function (res) {
                return res.data.access_token;
              });

            case 6:
              naverToken = _context4.sent;
              header = "Bearer " + naverToken;
              _context4.next = 10;
              return _axios["default"].get("https://openapi.naver.com/v1/nid/me", {
                headers: {
                  'Authorization': header
                }
              }).then(function (res) {
                return {
                  email: res.data.response.email,
                  nickname: res.data.response.nickname
                };
              });

            case 10:
              naverData = _context4.sent;
              _context4.next = 13;
              return _index.user.findOrCreate({
                where: {
                  email: naverData.email
                },
                defaults: {
                  nickname: naverData.nickname,
                  password: naverToken
                }
              });

            case 13:
              data = {
                email: naverData.email,
                nickname: naverData.nickname
              };
              accessToken = (0, _token.makeAccessToken)(data);
              refreshToken = (0, _token.makeRefreshToken)(data);
              res.status(200).send({
                data: {
                  user: naverData.email,
                  accessToken: accessToken
                },
                message: "Oauth login success!"
              });
              _context4.next = 37;
              break;

            case 19:
              if (!(state === "kakao")) {
                _context4.next = 37;
                break;
              }

              kakaoTokenUrl = 'https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=' + process.env.KAKAO_RESTAPI + '&redirect_uri=' + process.env.REDIRECTURL + '&code=' + code;
              _context4.next = 23;
              return _axios["default"].get(kakaoTokenUrl).then(function (res) {
                return res.data.access_token;
              });

            case 23:
              kakaoToken = _context4.sent;
              _header = "Bearer " + kakaoToken;
              _context4.next = 27;
              return _axios["default"].get("https://kapi.kakao.com/v2/user/me", {
                headers: {
                  'Authorization': _header
                }
              }).then(function (res) {
                return res.data.kakao_account.profile.nickname;
              });

            case 27:
              kakaoData = _context4.sent;
              _context4.next = 30;
              return _index.user.findOrCreate({
                where: {
                  nickname: kakaoData
                },
                defaults: {
                  email: 'kakaoLogin',
                  password: kakaoToken
                }
              });

            case 30:
              _data = {
                email: 'kakaoLogin',
                nickname: kakaoData
              };
              console.log('hi');
              _accessToken = (0, _token.makeAccessToken)(_data);
              _refreshToken = (0, _token.makeRefreshToken)(_data);
              res.status(200).send({
                data: {
                  user: kakaoData,
                  accessToken: _accessToken
                },
                message: "Oauth login success!"
              });
              _context4.next = 37;
              break;

            case 37:
              _context4.next = 42;
              break;

            case 39:
              _context4.prev = 39;
              _context4.t0 = _context4["catch"](0);
              res.status(500).send({
                message: "server error!"
              });

            case 42:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 39]]);
    }));

    function loginCallback(_x7, _x8) {
      return _loginCallback.apply(this, arguments);
    }

    return loginCallback;
  }()
};