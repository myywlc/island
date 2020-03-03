"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Comment = void 0;

var _db = require("../../core/db");

var _sequelize = require("sequelize");

class Comment extends _sequelize.Model {
  static async addComment(bookID, content) {
    const comment = await Comment.findOne({
      where: {
        book_id: bookID,
        content
      }
    });

    if (!comment) {
      return await Comment.create({
        book_id: bookID,
        content,
        nums: 1
      });
    } else {
      return await comment.increment('nums', {
        by: 1
      });
    }
  }

  static async getComments(bookID) {
    return await Comment.findAll({
      where: {
        book_id: bookID
      }
    });
  }

}

exports.Comment = Comment;
Comment.init({
  content: _sequelize.Sequelize.STRING(12),
  nums: {
    type: _sequelize.Sequelize.INTEGER,
    defaultValue: 0
  },
  book_id: _sequelize.Sequelize.INTEGER
}, {
  sequelize: _db.sequelize,
  tableName: 'comment'
});