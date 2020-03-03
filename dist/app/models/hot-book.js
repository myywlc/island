"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HotBook = void 0;

var _db = require("../../core/db");

var _sequelize = require("sequelize");

var _favor = require("./favor");

class HotBook extends _sequelize.Model {
  static async getAll() {
    const books = await HotBook.findAll({
      order: ['index']
    });
    const ids = [];
    books.forEach(book => {
      ids.push(book.id);
    });
    const favors = await _favor.Favor.findAll({
      where: {
        art_id: {
          [_sequelize.Op.in]: ids
        },
        type: 400
      },
      group: ['art_id'],
      attributes: ['art_id', [_sequelize.Sequelize.fn('COUNT', '*'), 'count']]
    });
    books.forEach(book => {
      HotBook._getEachBookStatus(book, favors);
    });
    return books;
  }

  static _getEachBookStatus(book, favors) {
    let count = 0;
    favors.forEach(favor => {
      if (book.id === favor.art_id) {
        count = favor.get('count');
      }
    });
    book.setDataValue('fav_nums', count);
    return book;
  }

}

exports.HotBook = HotBook;
HotBook.init({
  index: _sequelize.Sequelize.INTEGER,
  image: _sequelize.Sequelize.STRING,
  author: _sequelize.Sequelize.STRING,
  title: _sequelize.Sequelize.STRING
}, {
  sequelize: _db.sequelize,
  tableName: 'hot_book'
});