"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _validator = require("../../validators/validator");

var _util = require("../../../core/util");

var _enum = require("../../lib/enum");

var _user = require("../../models/user");

var _auth = require("../../../middlewares/auth");

var _wx = require("../../services/wx");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _koaRouter.default({
  prefix: '/v1/token'
});
router.post('/', async ctx => {
  const v = await new _validator.TokenValidator().validate(ctx);
  let token;

  switch (v.get('body.type')) {
    case _enum.LoginType.USER_EMAIL:
      token = await emailLogin(v.get('body.account'), v.get('body.secret'));
      break;

    case _enum.LoginType.USER_MINI_PROGRAM:
      token = await _wx.WXManager.codeToToken(v.get('body.account'));
      break;

    case _enum.LoginType.ADMIN_EMAIL:
      break;

    default:
      throw new global.errs.ParameterException('没有相应的处理函数');
  }

  ctx.body = {
    token
  };
});
router.post('/verify', async ctx => {
  // token
  const v = await new _validator.NotEmptyValidator().validate(ctx);

  const result = _auth.Auth.verifyToken(v.get('body.token'));

  ctx.body = {
    is_valid: result
  };
});

async function emailLogin(account, secret) {
  const user = await _user.User.verifyEmailPassword(account, secret);
  return (0, _util.generateToken)(user.id, _auth.Auth.USER);
}

var _default = router;
exports.default = _default;