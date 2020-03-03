import { Model, Sequelize } from 'sequelize';
import { clone, isArray, unset } from 'lodash';
import config from '../config';

const { dbName, host, port, user, password } = config.database;

export const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql',
  host,
  port,
  logging: false, // 是否打印 sql 信息
  timezone: '+08:00',
  define: {
    timestamps: true, // create_time update_time
    paranoid: true, // delete_time
    createdAt: 'created_at', // 修改默认表字段名
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    underscored: true, // 把驼峰转换成下划线命名
    freezeTableName: true, // 禁止表名复数
    scopes: {
      // 过滤相应字段
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

Model.prototype.toJSON = function() {
  let data = clone(this.dataValues);
  unset(data, 'created_at');
  unset(data, 'updated_at');
  unset(data, 'deleted_at');

  for (let key in data) {
    if (key === 'image') {
      if (!data[key].startsWith('http')) {
        data[key] = global.config.host + data[key];
      }
    }
  }

  if (isArray(this.exclude)) {
    this.exclude.forEach(item => {
      unset(data, item);
    });
  }
  return data;
};

// sequelize.close(); // 关闭MySQL连接

// mysql 连接状态查询
sequelize
  .authenticate()
  .then(() => {
    console.info('数据库连接成功');
  })
  .catch(err => {
    console.error('数据库连接失败');
  });
