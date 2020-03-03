"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Art = void 0;

var _interopRequireWildcard2 = _interopRequireDefault(require("@babel/runtime/helpers/interopRequireWildcard"));

var _sequelize = require("sequelize");

var _lodash = require("lodash");

var _classic = require("./classic");

class Art {
  constructor(art_id, type) {
    this.art_id = art_id;
    this.type = type;
  }

  async getDetail(uid) {
    const {
      Favor
    } = Promise.resolve().then(() => (0, _interopRequireWildcard2.default)(require('./favor')));
    const art = await Art.getData(this.art_id, this.type);

    if (!art) {
      throw new global.errs.NotFound();
    }

    const like = await Favor.userLikeIt(this.art_id, this.type, uid);
    return {
      art,
      like_status: like
    };
  }

  static async getList(artInfoList) {
    const artInfoObj = {
      100: [],
      200: [],
      300: []
    };

    for (let artInfo of artInfoList) {
      artInfoObj[artInfo.type].push(artInfo.art_id);
    }

    const arts = [];

    for (let key in artInfoObj) {
      const ids = artInfoObj[key];

      if (ids.length === 0) {
        continue;
      }

      key = parseInt(key);
      arts.push((await Art._getListByType(ids, key)));
    }

    return (0, _lodash.flatten)(arts);
  }

  static async _getListByType(ids, type) {
    let arts = [];
    const finder = {
      where: {
        id: {
          [_sequelize.Op.in]: ids
        }
      }
    };
    const scope = 'bh';

    switch (type) {
      case 100:
        arts = await _classic.Movie.scope(scope).findAll(finder);
        break;

      case 200:
        arts = await _classic.Music.scope(scope).findAll(finder);
        break;

      case 300:
        arts = await _classic.Sentence.scope(scope).findAll(finder);
        break;

      case 400:
        break;

      default:
        break;
    }

    return arts;
  }

  static async getData(art_id, type, useScope = true) {
    let art = null;
    const finder = {
      where: {
        id: art_id
      }
    };
    const scope = useScope ? 'bh' : null;

    switch (type) {
      case 100:
        art = await _classic.Movie.scope(scope).findOne(finder);
        break;

      case 200:
        art = await _classic.Music.scope(scope).findOne(finder);
        break;

      case 300:
        art = await _classic.Sentence.scope(scope).findOne(finder);

      case 400:
        const {
          Book
        } = Promise.resolve().then(() => (0, _interopRequireWildcard2.default)(require('./book')));
        art = await Book.scope(scope).findOne(finder);

        if (!art) {
          art = await Book.create({
            id: art_id
          });
        }

        break;

      default:
        break;
    }

    return art;
  }

}

exports.Art = Art;