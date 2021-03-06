import { sequelize } from '../../core/db';
import { Model, Sequelize } from 'sequelize';

export class Comment extends Model {
  static async addComment(bookID, content) {
    const comment = await Comment.findOne({
      where: {
        book_id: bookID,
        content,
      },
    });
    if (!comment) {
      return await Comment.create({
        book_id: bookID,
        content,
        nums: 1,
      });
    } else {
      return comment.increment('nums', {
        by: 1,
      });
    }
  }

  static async getComments(bookID) {
    return await Comment.findAll({
      where: {
        book_id: bookID,
      },
    });
  }
}

Comment.init(
  {
    content: Sequelize.STRING(12),
    nums: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    book_id: Sequelize.INTEGER,
  },
  {
    sequelize,
    tableName: 'comment',
  },
);
