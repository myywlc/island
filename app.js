require('module-alias/register');

const Koa = require('koa');
const parser = require('koa-bodyparser'); // 对于POST请求的处理,把koa2上下文的formData数据解析到ctx.request.body中
const statics = require('koa-static');
const logger = require('koa-logger');
const path = require('path');
const InitManager = require('./core/init');
const catchError = require('./middlewares/exception');


const app = new Koa();
app.use(logger());
app.use(catchError);
app.use(parser());
app.use(statics(path.join(__dirname, './static')));

InitManager.initCore(app);

app.listen(3000);
