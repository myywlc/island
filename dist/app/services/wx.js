"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WXManager = void 0;

var _util = _interopRequireDefault(require("util"));

var _axios = _interopRequireDefault(require("axios"));

var _user = require("../models/user");

var _util2 = require("../../core/util");

var _auth = require("../../middlewares/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class WXManager {
  static async codeToToken(code) {
    const url = _util.default.format(global.config.wx.loginUrl, global.config.wx.appId, global.config.wx.appSecret, code);

    const result = await _axios.default.get(url);

    if (result.status !== 200) {
      throw new global.errs.AuthFailed('openid获取失败');
    }

    const errcode = result.data.errcode;
    const errmsg = result.data.errmsg;

    if (errcode) {
      throw new global.errs.AuthFailed('openid获取失败:' + errmsg);
    }

    let user = await _user.User.getUserByOpenid(result.data.openid);

    if (!user) {
      user = await _user.User.registerByOpenid(result.data.openid);
    }

    return (0, _util2.generateToken)(user.id, _auth.Auth.USER);
  }

}

exports.WXManager = WXManager;