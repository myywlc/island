"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Favor = void 0;

var _db = require("../../core/db");

var _sequelize = require("sequelize");

var _art = require("./art");

class Favor extends _sequelize.Model {
  // 业务表
  static async like(art_id, type, uid) {
    const favor = await Favor.findOne({
      where: {
        art_id,
        type,
        uid
      }
    });

    if (favor) {
      throw new global.errs.LikeError();
    }

    return _db.sequelize.transaction(async t => {
      await Favor.create({
        art_id,
        type,
        uid
      }, {
        transaction: t
      });
      const art = await _art.Art.getData(art_id, type, false);
      await art.increment('fav_nums', {
        by: 1,
        transaction: t
      });
    });
  }

  static async disLike(art_id, type, uid) {
    const favor = await Favor.findOne({
      where: {
        art_id,
        type,
        uid
      }
    });

    if (!favor) {
      throw new global.errs.DislikeError();
    } // Favor 表 favor 记录


    return _db.sequelize.transaction(async t => {
      await favor.destroy({
        force: true,
        transaction: t
      });
      const art = await _art.Art.getData(art_id, type, false);
      await art.decrement('fav_nums', {
        by: 1,
        transaction: t
      });
    });
  }

  static async userLikeIt(art_id, type, uid) {
    const favor = await Favor.findOne({
      where: {
        uid,
        art_id,
        type
      }
    });
    return !!favor;
  }

  static async getMyClassicFavors(uid) {
    const arts = await Favor.findAll({
      where: {
        uid,
        type: {
          [_sequelize.Op.not]: 400
        }
      }
    });

    if (!arts) {
      throw new global.errs.NotFound();
    }

    return await _art.Art.getList(arts);
  }

  static async getBookFavor(uid, bookID) {
    const favorNums = await Favor.count({
      where: {
        art_id: bookID,
        type: 400
      }
    });
    const myFavor = await Favor.findOne({
      where: {
        art_id: bookID,
        uid,
        type: 400
      }
    });
    return {
      fav_nums: favorNums,
      like_status: myFavor ? 1 : 0
    };
  }

}

exports.Favor = Favor;
Favor.init({
  uid: _sequelize.Sequelize.INTEGER,
  art_id: _sequelize.Sequelize.INTEGER,
  type: _sequelize.Sequelize.INTEGER
}, {
  sequelize: _db.sequelize,
  tableName: 'favor'
});