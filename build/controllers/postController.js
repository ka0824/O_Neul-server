"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

module.exports = {
  write: function () {
    var _write = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              res.send();

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function write(_x, _x2) {
      return _write.apply(this, arguments);
    }

    return write;
  }(),
  "delete": function () {
    var _delete2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              res.send();

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function _delete(_x3, _x4) {
      return _delete2.apply(this, arguments);
    }

    return _delete;
  }(),
  edit: function () {
    var _edit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
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

    function edit(_x5, _x6) {
      return _edit.apply(this, arguments);
    }

    return edit;
  }()
};