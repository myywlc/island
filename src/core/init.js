const path = require('path');
const parser = require('koa-bodyparser'); // 对于POST请求的处理,把koa2上下文的formData数据解析到ctx.request.body中
const statics = require('koa-static');
const logger = require('koa-logger');
const dayjs = require('dayjs');
const catchError = require('../middlewares/exception');
const requireDirectory = require('require-directory');
const Router = require('koa-router');

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

  static loadConfig(path = '') {
    const configPath = path || `${process.cwd()}/config/config.js`;
    global.config = require(configPath);
  }

  static initLoadRouters() {
    //path config
    const apiDirectory = `${process.cwd()}/app/api`;
    requireDirectory(module, apiDirectory, {
      visit: whenLoadModule,
    });

    function whenLoadModule(obj) {
      if (obj instanceof Router) {
        InitManager.app.use(obj.routes());
      }
    }
  }

  static loadHttpException() {
    global.errs = require('./http-exception');
  }
}

module.exports = InitManager;
