const Koa = require('koa');
const path = require('path');
const parser = require('koa-bodyparser'); // 对于POST请求的处理,把koa2上下文的formData数据解析到ctx.request.body中
const statics = require('koa-static');
const logger = require('koa-logger');
const dayjs = require('dayjs');
const catchError = require('./middlewares/exception');
const InitManager = require('./core/init');

const app = new Koa();

app.use(
  logger(str => {
    console.log(`${dayjs().format('YYYY-MM-DD HH:mm:ss.SSS')} ${str}`);
  }),
);
app.use(catchError);
app.use(parser());
app.use(statics(path.join(__dirname, './static')));

InitManager.initCore(app);



app.listen(3000, () => {
  console.log('listen on 3000');
});
