import Router from 'koa-router';
import path from 'path';
import fs from 'fs';

const router = new Router({
  prefix: '/api/v1/video',
});

router.get('/file/:id', async ctx => {
  const { id } = ctx.params;
  const fileType = id.split('.')[1];
  const filePath = path.join(process.cwd(), id);
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const { range } = ctx.req.headers;

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    if (start >= fileSize) {
      ctx.status = 416;
      ctx.body = `requested range not satisfiable: ${start} >= ${fileSize}`;
      return;
    }

    const chunksize = end - start + 1;
    const stream = fs.createReadStream(filePath, { start, end });
    stream.on('error', err => {
      console.log(err, 'err');
    });

    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': `video/${fileType}`,
    };
    ctx.set(head);

    ctx.status = 206;
    ctx.body = stream;
  } else {
    const stream = fs.createReadStream(filePath);
    stream.on('error', err => {
      console.log(err, 'err');
    });

    const head = {
      'Content-Length': fileSize,
      'Content-Type': `video/${fileType}`,
    };
    ctx.set(head);

    ctx.status = 200;
    ctx.body = stream;
  }
});

export default router;
