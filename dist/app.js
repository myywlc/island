"use strict";

var _koa = _interopRequireDefault(require("koa"));

var _init = _interopRequireDefault(require("./core/init"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = new _koa.default();

_init.default.initCore(app);

app.listen(3000, () => {
  console.log('listen on 3000');
});