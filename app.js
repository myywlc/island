require('module-alias/register');

const Koa = require('koa');
const parser = require('koa-bodyparser');
const path = require('path');
const InitManager = require('./core/init');
const catchError = require('./middlewares/exception');

require('./app/models/classic');
const app = new Koa();
app.use(catchError);
app.use(parser());
app.use(static(path.join(__dirname, './static')));

InitManager.initCore(app);


app.listen(3000);
