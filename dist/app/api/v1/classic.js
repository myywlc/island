"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _flow = require("../../models/flow");

var _art = require("../../models/art");

var _favor = require("../../models/favor");

var _auth = require("../../../middlewares/auth");

var _validator = require("../../validators/validator");

const router = new _koaRouter.default({
  prefix: '/v1/classic'
});
router.get('/latest', new _auth.Auth().m, async ctx => {
  const flow = await _flow.Flow.findOne({
    order: [['index', 'DESC']]
  });
  const art = await _art.Art.getData(flow.art_id, flow.type);
  const likeLatest = await _favor.Favor.userLikeIt(flow.art_id, flow.type, ctx.auth.uid);
  art.setDataValue('index', flow.index);
  art.setDataValue('like_status', likeLatest);
  ctx.body = art;
});
router.get('/:index/next', new _auth.Auth().m, async ctx => {
  const v = await new _validator.PositiveIntegerValidator().validate(ctx, {
    id: 'index'
  });
  const index = v.get('path.index');
  const flow = await _flow.Flow.findOne({
    where: {
      index: index + 1
    }
  });

  if (!flow) {
    throw new global.errs.NotFound();
  }

  const art = await _art.Art.getData(flow.art_id, flow.type);
  const likeNext = await _favor.Favor.userLikeIt(flow.art_id, flow.type, ctx.auth.uid);
  art.setDataValue('index', flow.index);
  art.setDataValue('like_status', likeNext);
  ctx.body = art;
});
router.get('/:index/previous', new _auth.Auth().m, async ctx => {
  const v = await new _validator.PositiveIntegerValidator().validate(ctx, {
    id: 'index'
  });
  const index = v.get('path.index');
  const flow = await _flow.Flow.findOne({
    where: {
      index: index - 1
    }
  });

  if (!flow) {
    throw new global.errs.NotFound();
  }

  const art = await _art.Art.getData(flow.art_id, flow.type);
  const likePrevious = await _favor.Favor.userLikeIt(flow.art_id, flow.type, ctx.auth.uid);
  art.setDataValue('index', flow.index);
  art.setDataValue('like_status', likePrevious);
  ctx.body = art;
});
router.get('/:type/:id', new _auth.Auth().m, async ctx => {
  const v = await new _validator.ClassicValidator().validate(ctx);
  const id = v.get('path.id');
  const type = parseInt(v.get('path.type'));
  const artDetail = await new _art.Art(id, type).getDetail(ctx.auth.uid);
  artDetail.art.setDataValue('like_status', artDetail.like_status);
  ctx.body = artDetail.art;
});
router.get('/:type/:id/favor', new _auth.Auth().m, async ctx => {
  const v = await new _validator.ClassicValidator().validate(ctx);
  const id = v.get('path.id');
  const type = parseInt(v.get('path.type'));
  const artDetail = await new _art.Art(id, type).getDetail(ctx.auth.uid);
  ctx.body = {
    fav_nums: artDetail.art.fav_nums,
    like_status: artDetail.like_status
  };
});
router.get('/favor', new _auth.Auth().m, async ctx => {
  const uid = ctx.auth.uid;
  ctx.body = await _favor.Favor.getMyClassicFavors(uid);
});
var _default = router;
exports.default = _default;