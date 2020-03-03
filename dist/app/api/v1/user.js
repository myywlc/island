"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _validator = require("../../validators/validator");

var _user = require("../../models/user");

var _helper = require("../../lib/helper");

const router = new _koaRouter.default({
  prefix: '/v1/user'
});
router.post('/register', async ctx => {
  const v = await new _validator.RegisterValidator().validate(ctx);
  const user = {
    email: v.get('body.email'),
    password: v.get('body.password2'),
    nickname: v.get('body.nickname')
  };
  await _user.User.create(user);
  (0, _helper.success)();
});
var _default = router;
exports.default = _default;