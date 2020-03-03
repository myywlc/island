"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _koaBodyparser = _interopRequireDefault(require("koa-bodyparser"));

var _koaStatic = _interopRequireDefault(require("koa-static"));

var _koaLogger = _interopRequireDefault(require("koa-logger"));

var _dayjs = _interopRequireDefault(require("dayjs"));

var _exception = _interopRequireDefault(require("../middlewares/exception"));

var _requireDirectory = _interopRequireDefault(require("require-directory"));

var _koaRouter = _interopRequireDefault(require("koa-router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

  static loadConfig(pathStr = '') {
    const configPath = pathStr || _path.default.resolve(__dirname, '../config/index.js');

    console.log(configPath, 'configPath');
    global.config = Promise.resolve().then(() => _interopRequireWildcard(require(`${configPath}`)));
  }

  static initLoadRouters() {
    //path config
    const apiDirectory = _path.default.resolve(__dirname, '../app/api');

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
    global.errs = Promise.resolve().then(() => _interopRequireWildcard(require('./http-exception')));
  }

}

var _default = InitManager;
exports.default = _default;