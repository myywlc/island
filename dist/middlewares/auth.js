"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Auth = void 0;

var _basicAuth = _interopRequireDefault(require("basic-auth"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Auth {
  constructor(level) {
    this.level = level || 1;
    Auth.USER = 8;
    Auth.ADMIN = 16;
    Auth.SUPER_ADMIN = 32;
  }

  get m() {
    return async (ctx, next) => {
      const userToken = (0, _basicAuth.default)(ctx.req);
      let errMsg = 'token不合法';
      let decode;

      if (!userToken || !userToken.name) {
        throw new global.errs.Forbbiden(errMsg);
      }

      try {
        decode = _jsonwebtoken.default.verify(userToken.name, global.config.security.secretKey);
      } catch (error) {
        if (error.name === 'TokenExpiredError') {
          errMsg = 'token已过期';
        }

        throw new global.errs.Forbbiden(errMsg);
      }

      if (decode.scope < this.level) {
        errMsg = '权限不足';
        throw new global.errs.Forbbiden(errMsg);
      }

      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope
      };
      await next();
    };
  }

  static verifyToken(token) {
    try {
      _jsonwebtoken.default.verify(token, global.config.security.secretKey);

      return true;
    } catch (error) {
      return false;
    }
  }

}

exports.Auth = Auth;