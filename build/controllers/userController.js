"use strict";

var _index = require("../../models/index");

var _token = require("../token/token");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

module.exports = {
  signIn: function () {
    var _signIn = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var _req$body, email, password, isValid, data, accessToken, refreshToken;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _req$body = req.body, email = _req$body.email, password = _req$body.password;
              _context.prev = 1;
              _context.next = 4;
              return _index.user.findOne({
                where: {
                  email: email,
                  password: password
                }
              });

            case 4:
              isValid = _context.sent;

              if (!isValid) {
                res.status(401).send({
                  message: "invalid email or password!"
                });
              } else {
                data = isValid.dataValues;
                delete data.password;
                accessToken = (0, _token.makeAccessToken)(data);
                refreshToken = (0, _token.makeRefreshToken)(data);
                res.status(200).send({
                  data: {
                    user: data.nickname,
                    accessToken: accessToken
                  },
                  message: "signIn success!"
                });
              }

              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](1);
              res.status(500).send({
                message: "server error!"
              });

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 8]]);
    }));

    function signIn(_x, _x2) {
      return _signIn.apply(this, arguments);
    }

    return signIn;
  }(),
  signUp: function () {
    var _signUp = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      var _req$body2, email, password, nickname, isExistedEmail, isExistedNickname;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password, nickname = _req$body2.nickname;
              _context2.prev = 1;
              _context2.next = 4;
              return _index.user.findOne({
                where: {
                  email: email
                }
              });

            case 4:
              isExistedEmail = _context2.sent;
              _context2.next = 7;
              return _index.user.findOne({
                where: {
                  nickname: nickname
                }
              });

            case 7:
              isExistedNickname = _context2.sent;

              if (!isExistedEmail) {
                _context2.next = 12;
                break;
              }

              res.status(409).send({
                message: "email already existed!"
              });
              _context2.next = 19;
              break;

            case 12:
              if (!isExistedNickname) {
                _context2.next = 16;
                break;
              }

              res.status(409).send({
                message: "nickname already existed!"
              });
              _context2.next = 19;
              break;

            case 16:
              _context2.next = 18;
              return _index.user.create({
                email: email,
                password: password,
                nickname: nickname
              });

            case 18:
              res.status(201).send({
                data: {
                  email: email,
                  nickname: nickname
                },
                message: "signUp success!"
              });

            case 19:
              _context2.next = 24;
              break;

            case 21:
              _context2.prev = 21;
              _context2.t0 = _context2["catch"](1);
              res.status(500).send({
                message: "server error!"
              });

            case 24:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 21]]);
    }));

    function signUp(_x3, _x4) {
      return _signUp.apply(this, arguments);
    }

    return signUp;
  }(),
  edit: function () {
    var _edit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
      var decodedToken, _req$body3, password, nickname, isExisted;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              decodedToken = (0, _token.isAuthorized)(req);
              _req$body3 = req.body, password = _req$body3.password, nickname = _req$body3.nickname;
              _context3.prev = 2;
              _context3.next = 5;
              return _index.user.findOne({
                where: {
                  nickname: nickname
                }
              });

            case 5:
              isExisted = _context3.sent;

              if (isExisted) {
                _context3.next = 12;
                break;
              }

              _context3.next = 9;
              return _index.user.update({
                password: password,
                nickname: nickname
              }, {
                where: {
                  email: decodedToken.email
                }
              });

            case 9:
              res.status(201).send({
                message: "edit userInfo success!"
              });
              _context3.next = 19;
              break;

            case 12:
              if (!(isExisted.dataValues.email !== decodedToken.email)) {
                _context3.next = 16;
                break;
              }

              res.status(409).send({
                message: "nickname already existed"
              });
              _context3.next = 19;
              break;

            case 16:
              _context3.next = 18;
              return _index.user.update({
                password: password,
                nickname: nickname
              }, {
                where: {
                  email: decodedToken.email
                }
              });

            case 18:
              res.status(201).send({
                message: "edit userInfo success!"
              });

            case 19:
              _context3.next = 24;
              break;

            case 21:
              _context3.prev = 21;
              _context3.t0 = _context3["catch"](2);
              res.status(500).send({
                message: "sever error!"
              });

            case 24:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[2, 21]]);
    }));

    function edit(_x5, _x6) {
      return _edit.apply(this, arguments);
    }

    return edit;
  }()
};