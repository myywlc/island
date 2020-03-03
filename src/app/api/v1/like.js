import Router from 'koa-router';
import { LikeValidator } from '../../validators/validator';
import { Favor } from '../../models/favor';
import { success } from '../../lib/helper';
import { Auth } from '../../../middlewares/auth';

const router = new Router({
  prefix: '/v1/like',
});

router.post('/', new Auth().m, async ctx => {
  const v = await new LikeValidator().validate(ctx, {
    id: 'art_id',
  });
  await Favor.like(v.get('body.art_id'), v.get('body.type'), ctx.auth.uid);
  success();
});

router.post('/cancel', new Auth().m, async ctx => {
  const v = await new LikeValidator().validate(ctx, {
    id: 'art_id',
  });
  await Favor.disLike(v.get('body.art_id'), v.get('body.type'), ctx.auth.uid);
  success();
});

export default router;
