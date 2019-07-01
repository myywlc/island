const Router = require('koa-router');
const { Flow } = require('../../models/flow');
const { Art } = require('../../models/art');
const { Favor } = require('../../models/favor');
const { Auth } = require('../../../middlewares/auth');

const router = new Router({
  prefix: '/v1/classic',
});

router.get('/latest', new Auth().m, async (ctx, next) => {
  const flow = await Flow.findOne({
    order: [
      ['index', 'DESC'],
    ],
  });
  const art = await Art.getData(flow.art_id, flow.type);
  const likeLatest = await Favor.userLikeIt(flow.art_id, flow.type, ctx.auth.uid);

  art.setDataValue('index', flow.index);
  art.setDataValue('like_status', likeLatest);

  ctx.body = art;
});

module.exports = router;
