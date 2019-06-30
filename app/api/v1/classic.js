const Router = require('koa-router');
const { PositiveIntegerValidator } = require('../../validators/validator');
const router = new Router({
  prefix: '/v1/classic',
});

const { Auth } = require('../../../middlewares/auth');

router.get('/latest', new Auth().m, async (ctx, next) => {

});

module.exports = router;
