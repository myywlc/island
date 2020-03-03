"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _hotBook = require("../../models/hot-book");

var _book = require("../../models/book");

var _favor = require("../../models/favor");

var _bookComment = require("../../models/book-comment");

var _auth = require("../../../middlewares/auth");

var _helper = require("../../lib/helper");

var _validator = require("../../validators/validator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _koaRouter.default({
  prefix: '/v1/book'
});
router.get('/hot_list', async ctx => {
  const books = await _hotBook.HotBook.getAll();
  ctx.body = {
    books
  };
});
router.get('/:id/detail', async ctx => {
  const v = await new _validator.PositiveIntegerValidator().validate(ctx);
  const book = new _book.Book();
  ctx.body = await book.detail(v.get('path.id'));
});
router.get('/search', async ctx => {
  const v = await new _validator.SearchValidator().validate(ctx);
  ctx.body = await _book.Book.searchFromYuShu(v.get('query.q'), v.get('query.start'), v.get('query.count'));
});
router.get('/favor/count', new _auth.Auth().m, async ctx => {
  const count = await _book.Book.getMyFavorBookCount(ctx.auth.uid);
  ctx.body = {
    count
  };
});
router.get('/:book_id/favor', new _auth.Auth().m, async ctx => {
  const v = await new _validator.PositiveIntegerValidator().validate(ctx, {
    id: 'book_id'
  });
  ctx.body = await _favor.Favor.getBookFavor(ctx.auth.uid, v.get('path.book_id'));
});
router.post('/add/short_comment', new _auth.Auth().m, async ctx => {
  const v = await new _validator.AddShortCommentValidator().validate(ctx, {
    id: 'book_id'
  });
  await _bookComment.Comment.addComment(v.get('body.book_id'), v.get('body.content'));
  (0, _helper.success)();
});
router.get('/:book_id/short_comment', new _auth.Auth().m, async ctx => {
  const v = await new _validator.PositiveIntegerValidator().validate(ctx, {
    id: 'book_id'
  });
  const book_id = v.get('path.book_id');
  const comments = await _bookComment.Comment.getComments(book_id);
  ctx.body = {
    comments,
    book_id
  };
});
router.get('/hot_keyword', async ctx => {
  ctx.body = {
    hot: ['Python', '哈利·波特', '村上春树', '东野圭吾', '白夜行', '韩寒', '金庸', '王小波']
  };
});
var _default = router;
exports.default = _default;