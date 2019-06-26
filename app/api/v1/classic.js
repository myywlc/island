const Router = require('koa-router');
const router = new Router();

const { PositiveIntegerValidator } = require('../../validators/validator');

router.post('/v1/:id/classic/latest', async (ctx, next) => {

  const path = ctx.params;
  const query = ctx.request.query;
  const header = ctx.request.header;
  const body = ctx.request.body;
  require('../../models/user');
  const v = await new PositiveIntegerValidator().validate(ctx);
  const id = v.get('body.b.e.x', parsed = false);
  ctx.body = 'success';
});

module.exports = router;
