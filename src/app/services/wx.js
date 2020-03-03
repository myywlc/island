import util from 'util';
import axios from 'axios';
import { User } from '../models/user';
import { generateToken } from '../../core/util';
import { Auth } from '../../middlewares/auth';

export class WXManager {
  static async codeToToken(code) {
    const url = util.format(
      global.config.wx.loginUrl,
      global.config.wx.appId,
      global.config.wx.appSecret,
      code,
    );

    const result = await axios.get(url);
    if (result.status !== 200) {
      throw new global.errs.AuthFailed('openid获取失败');
    }
    const errcode = result.data.errcode;
    const errmsg = result.data.errmsg;
    if (errcode) {
      throw new global.errs.AuthFailed('openid获取失败:' + errmsg);
    }

    let user = await User.getUserByOpenid(result.data.openid);
    if (!user) {
      user = await User.registerByOpenid(result.data.openid);
    }
    return generateToken(user.id, Auth.USER);
  }
}
