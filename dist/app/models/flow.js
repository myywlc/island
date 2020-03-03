"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Flow = void 0;

var _db = require("../../core/db");

var _sequelize = require("sequelize");

class Flow extends _sequelize.Model {}

exports.Flow = Flow;
Flow.init({
  index: _sequelize.Sequelize.INTEGER,
  art_id: _sequelize.Sequelize.INTEGER,
  type: _sequelize.Sequelize.INTEGER
}, {
  sequelize: _db.sequelize,
  tableName: 'flow'
});