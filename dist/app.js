"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _koa = _interopRequireDefault(require("koa"));

var _init = _interopRequireDefault(require("./core/init"));

const app = new _koa.default();

_init.default.initCore(app);

app.listen(3000, () => {
  console.log('listen on 3000');
});