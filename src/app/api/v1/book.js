import Router from 'koa-router';
import { HotBook } from '../../models/hot-book';
import { Book } from '../../models/book';
import { Favor } from '../../models/favor';
import { Comment } from '../../models/book-comment';
import { Auth } from '../../../middlewares/auth';
import { success } from '../../lib/helper';
import {
  AddShortCommentValidator,
  PositiveIntegerValidator,
  SearchValidator,
} from '../../validators/validator';

const router = new Router({
  prefix: '/api/v1/book',
});

router.get('/hot_list', async ctx => {
  const books = await HotBook.getAll();
  ctx.body = {
    books,
  };
});

router.get('/:id/detail', async ctx => {
  const v = await new PositiveIntegerValidator().validate(ctx);
  const book = new Book();
  ctx.body = await book.detail(v.get('path.id'));
});

router.get('/search', async ctx => {
  const v = await new SearchValidator().validate(ctx);
  ctx.body = await Book.searchFromYuShu(v.get('query.q'), v.get('query.start'), v.get('query.count'));
});

router.get('/favor/count', new Auth().m, async ctx => {
  const count = await Book.getMyFavorBookCount(ctx.auth.uid);
  ctx.body = {
    count,
  };
});

router.get('/:book_id/favor', new Auth().m, async ctx => {
  const v = await new PositiveIntegerValidator().validate(ctx, {
    id: 'book_id',
  });
  ctx.body = await Favor.getBookFavor(ctx.auth.uid, v.get('path.book_id'));
});

router.post('/add/short_comment', new Auth().m, async ctx => {
  const v = await new AddShortCommentValidator().validate(ctx, {
    id: 'book_id',
  });
  await Comment.addComment(v.get('body.book_id'), v.get('body.content'));
  success();
});

router.get('/:book_id/short_comment', new Auth().m, async ctx => {
  const v = await new PositiveIntegerValidator().validate(ctx, {
    id: 'book_id',
  });
  const book_id = v.get('path.book_id');
  const comments = await Comment.getComments(book_id);
  ctx.body = {
    comments,
    book_id,
  };
});

router.get('/hot_keyword', async ctx => {
  ctx.body = {
    hot: ['node', 'Python', '哈利·波特', '村上春树', '东野圭吾', '白夜行', '韩寒', '金庸', '王小波'],
  };
});

export default router;
