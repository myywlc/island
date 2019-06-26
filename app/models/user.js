const { sequelize } = require('../../core/db');
const { Sequelize, Model } = require('sequelize');

class User extends Model {

}

User.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nickname: Sequelize.STRING,
  email: {
    type: Sequelize.STRING(128),
    unique: true,
  },
  password: Sequelize.STRING,
  openid: {
    type: Sequelize.STRING(64),
    unique: true,
  },
}, {
  sequelize,
  tableName: 'user',
});

module.exports = {
  User,
};
