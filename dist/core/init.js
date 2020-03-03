"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _interopRequireWildcard2 = _interopRequireDefault(require("@babel/runtime/helpers/interopRequireWildcard"));

var _path = _interopRequireDefault(require("path"));

var _koaBodyparser = _interopRequireDefault(require("koa-bodyparser"));

var _koaStatic = _interopRequireDefault(require("koa-static"));

var _koaLogger = _interopRequireDefault(require("koa-logger"));

var _dayjs = _interopRequireDefault(require("dayjs"));

var _exception = _interopRequireDefault(require("../middlewares/exception"));

var _requireDirectory = _interopRequireDefault(require("require-directory"));

var _koaRouter = _interopRequireDefault(require("koa-router"));

// 对于POST请求的处理,把koa2上下文的formData数据解析到ctx.request.body中
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
    InitManager.app.use((0, _koaLogger.default)(str => {
      console.log(`${(0, _dayjs.default)().format('YYYY-MM-DD HH:mm:ss.SSS')} ${str}`);
    }));
    InitManager.app.use(_exception.default);
    InitManager.app.use((0, _koaBodyparser.default)());
    InitManager.app.use((0, _koaStatic.default)(_path.default.join(process.cwd(), './static')));
  }

  static loadConfig(path = '') {
    const configPath = path || path.join(__dirname, '../config/index.js');
    global.config = Promise.resolve().then(() => (0, _interopRequireWildcard2.default)(require(`${configPath}`)));
  }

  static initLoadRouters() {
    //path config
    const apiDirectory = _path.default.join(__dirname, '../app/api');

    (0, _requireDirectory.default)(module, apiDirectory, {
      visit: whenLoadModule
    });

    function whenLoadModule(obj) {
      if (obj instanceof _koaRouter.default) {
        InitManager.app.use(obj.routes());
      }
    }
  }

  static loadHttpException() {
    global.errs = Promise.resolve().then(() => (0, _interopRequireWildcard2.default)(require('./http-exception')));
  }

}

var _default = InitManager;
exports.default = _default;