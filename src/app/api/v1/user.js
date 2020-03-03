import Router from 'koa-router';
import { RegisterValidator } from '../../validators/validator';
import { User } from '../../models/user';
import { success } from '../../lib/helper';

const router = new Router({
  prefix: '/v1/user',
});

router.post('/register', async ctx => {
  const v = await new RegisterValidator().validate(ctx);
  const user = {
    email: v.get('body.email'),
    password: v.get('body.password2'),
    nickname: v.get('body.nickname'),
  };

  await User.create(user);
  success();
});

export default router;
