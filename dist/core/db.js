"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sequelize = void 0;

var _sequelize = require("sequelize");

var _lodash = require("lodash");

var _config = require("../config/config");

const {
  dbName,
  host,
  port,
  user,
  password
} = _config.database;
const sequelize = new _sequelize.Sequelize(dbName, user, password, {
  dialect: 'mysql',
  host,
  port,
  logging: false,
  // 是否打印 sql 信息
  timezone: '+08:00',
  define: {
    timestamps: true,
    // create_time update_time
    paranoid: true,
    // delete_time
    createdAt: 'created_at',
    // 修改默认表字段名
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    underscored: true,
    // 把驼峰转换成下划线命名
    freezeTableName: true,
    // 禁止表名复数
    scopes: {
      // 过滤相应字段
      bh: {
        attributes: {
          exclude: ['updated_at', 'deleted_at', 'created_at']
        }
      }
    }
  }
}); // 是否操作同步 models 到数据库

exports.sequelize = sequelize;
sequelize.sync({
  force: false // 删除重置表

});

_sequelize.Model.prototype.toJSON = function () {
  let data = (0, _lodash.clone)(this.dataValues);
  (0, _lodash.unset)(data, 'created_at');
  (0, _lodash.unset)(data, 'updated_at');
  (0, _lodash.unset)(data, 'deleted_at');

  for (let key in data) {
    if (key === 'image') {
      if (!data[key].startsWith('http')) {
        data[key] = global.config.host + data[key];
      }
    }
  }

  if ((0, _lodash.isArray)(this.exclude)) {
    this.exclude.forEach(item => {
      (0, _lodash.unset)(data, item);
    });
  }

  return data;
}; // sequelize.close(); // 关闭MySQL连接
// mysql 连接状态查询


sequelize.authenticate().then(() => {
  console.info('数据库连接成功');
}).catch(err => {
  console.error('数据库连接失败');
});