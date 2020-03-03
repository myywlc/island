"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _validator = require("../../validators/validator");

var _favor = require("../../models/favor");

var _helper = require("../../lib/helper");

var _auth = require("../../../middlewares/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _koaRouter.default({
  prefix: '/v1/like'
});
router.post('/', new _auth.Auth().m, async ctx => {
  const v = await new _validator.LikeValidator().validate(ctx, {
    id: 'art_id'
  });
  await _favor.Favor.like(v.get('body.art_id'), v.get('body.type'), ctx.auth.uid);
  (0, _helper.success)();
});
router.post('/cancel', new _auth.Auth().m, async ctx => {
  const v = await new _validator.LikeValidator().validate(ctx, {
    id: 'art_id'
  });
  await _favor.Favor.disLike(v.get('body.art_id'), v.get('body.type'), ctx.auth.uid);
  (0, _helper.success)();
});
var _default = router;
exports.default = _default;