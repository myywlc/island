import path from 'path';
import parser from 'koa-bodyparser'; // 对于POST请求的处理,把koa2上下文的formData数据解析到ctx.request.body中
import statics from 'koa-static';
import logger from 'koa-logger';
import dayjs from 'dayjs';
import catchError from '../middlewares/exception';
import requireDirectory from 'require-directory';
import Router from 'koa-router';

class InitManager {
  static initCore(app) {
    //入口方法
    InitManager.app = app;
    InitManager.loadKoaMiddleware();
    InitManager.initLoadRouters();
    InitManager.loadHttpException();
    InitManager.loadConfig();
  }

  static loadKoaMiddleware() {
    InitManager.app.use(
      logger(str => {
        console.log(`${dayjs().format('YYYY-MM-DD HH:mm:ss.SSS')} ${str}`);
      }),
    );
    InitManager.app.use(catchError);
    InitManager.app.use(parser());
    InitManager.app.use(statics(path.join(process.cwd(), './static')));
  }

  static async loadConfig(pathStr = '') {
    const configPath = pathStr || path.resolve(__dirname, '../config/index.js');
    global.config = await import(configPath);
  }

  static initLoadRouters() {
    //path config
    const apiDirectory = path.resolve(__dirname, '../app/api');
    requireDirectory(module, apiDirectory, {
      visit: whenLoadModule,
    });

    function whenLoadModule(obj) {
      const targetRouter = obj.default;
      if (targetRouter instanceof Router) {
        InitManager.app.use(targetRouter.routes());
      }
    }
  }

  static async loadHttpException() {
    global.errs = await import('./http-exception');
  }
}

export default InitManager;
