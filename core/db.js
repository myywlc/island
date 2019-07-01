const Sequelize = require('sequelize');
const { dbName, host, port, user, password } = require('../config/config1').database;

const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql',
  host,
  port,
  logging: false, // 是否打印 sql 信息
  timezone: '+08:00',
  define: {
    timestamps: true, // create_time  update_time
    paranoid: true, // delete_time
    createdAt: 'created_at', // 修改默认表字段名
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    underscored: true, // 把驼峰转换成下划线命名
    freezeTableName: true,
    scopes: { // 过滤相应字段
      bh: {
        attributes: {
          exclude: ['updated_at', 'deleted_at', 'created_at'],
        },
      },
    },
  },
});

// 是否操作同步 models 到数据库
sequelize.sync({
  force: false, // 删除重置表
});

module.exports = {
  sequelize,
};
