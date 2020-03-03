"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Book = void 0;

var _db = require("../../core/db");

var _axios = _interopRequireDefault(require("axios"));

var _util = _interopRequireDefault(require("util"));

var _sequelize = require("sequelize");

var _favor = require("./favor");

class Book extends _sequelize.Model {
  async detail(id) {
    const url = _util.default.format(global.config.yushu.detailUrl, id);

    const detail = await _axios.default.get(url);
    return detail.data;
  }

  static async getMyFavorBookCount(uid) {
    return await _favor.Favor.count({
      where: {
        type: 400,
        uid
      }
    });
  }

  static async searchFromYuShu(q, start, count, summary = 1) {
    const url = _util.default.format(global.config.yushu.keywordUrl, encodeURI(q), count, start, summary);

    const result = await _axios.default.get(url);
    return result.data;
  }

}

exports.Book = Book;
Book.init({
  id: {
    type: _sequelize.Sequelize.INTEGER,
    primaryKey: true
  },
  fav_nums: {
    type: _sequelize.Sequelize.INTEGER,
    defaultValue: 0
  }
}, {
  sequelize: _db.sequelize,
  tableName: 'book'
});