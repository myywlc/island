"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Music = exports.Sentence = exports.Movie = void 0;

var _db = require("../../core/db");

var _sequelize = require("sequelize");

const classicFields = {
  image: _sequelize.Sequelize.STRING,
  content: _sequelize.Sequelize.STRING,
  pubdate: _sequelize.Sequelize.DATEONLY,
  fav_nums: {
    type: _sequelize.Sequelize.INTEGER,
    defaultValue: 0
  },
  title: _sequelize.Sequelize.STRING,
  type: _sequelize.Sequelize.TINYINT
};

class Movie extends _sequelize.Model {}

exports.Movie = Movie;
Movie.init(classicFields, {
  sequelize: _db.sequelize,
  tableName: 'movie'
});

class Sentence extends _sequelize.Model {}

exports.Sentence = Sentence;
Sentence.init(classicFields, {
  sequelize: _db.sequelize,
  tableName: 'sentence'
});

class Music extends _sequelize.Model {}

exports.Music = Music;
const musicFields = Object.assign({
  url: _sequelize.Sequelize.STRING
}, classicFields);
Music.init(musicFields, {
  sequelize: _db.sequelize,
  tableName: 'music'
});