"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _db = require("../../core/db");

var _sequelize = require("sequelize");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class User extends _sequelize.Model {
  static async verifyEmailPassword(email, plainPassword) {
    const user = await User.findOne({
      where: {
        email
      }
    });

    if (!user) {
      throw new global.errs.AuthFailed('账号不存在');
    } // user.password === plainPassword


    const correct = _bcryptjs.default.compareSync(plainPassword, user.password);

    if (!correct) {
      throw new global.errs.AuthFailed('密码不正确');
    }

    return user;
  }

  static async getUserByOpenid(openid) {
    return await User.findOne({
      where: {
        openid
      }
    });
  }

  static async registerByOpenid(openid) {
    return await User.create({
      openid
    });
  }

}

exports.User = User;
User.init({
  id: {
    type: _sequelize.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nickname: _sequelize.Sequelize.STRING,
  email: {
    type: _sequelize.Sequelize.STRING(128),
    unique: true
  },
  password: {
    type: _sequelize.Sequelize.STRING,

    set(val) {
      // 盐加密
      const salt = _bcryptjs.default.genSaltSync(10);

      const psw = _bcryptjs.default.hashSync(val, salt);

      this.setDataValue('password', psw);
    }

  },
  openid: {
    type: _sequelize.Sequelize.STRING(64),
    unique: true
  }
}, {
  sequelize: _db.sequelize,
  tableName: 'user'
});