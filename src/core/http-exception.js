export class HttpException extends Error {
  constructor(msg = '服务器异常', errorCode = 10000, code = 400) {
    super();
    this.errorCode = errorCode;
    this.code = code;
    this.msg = msg;
  }
}

export class ParameterException extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 400;
    this.msg = msg || '参数错误';
    this.errorCode = errorCode || 10000;
  }
}

export class Success extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 201;
    this.msg = msg || 'ok';
    this.errorCode = errorCode || 0;
  }
}

export class NotFound extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.msg = msg || '资源未找到';
    this.errorCode = errorCode || 10000;
    this.code = 404;
  }
}

export class AuthFailed extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.msg = msg || '授权失败';
    this.errorCode = errorCode || 10004;
    this.code = 401;
  }
}

export class Forbbiden extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.msg = msg || '禁止访问';
    this.errorCode = errorCode || 10006;
    this.code = 403;
  }
}

export class LikeError extends HttpException {
  constructor(msg, error_code) {
    super();
    this.code = 400;
    this.msg = '你已经点赞过';
    this.error_code = 60001;
  }
}

export class DislikeError extends HttpException {
  constructor(msg, error_code) {
    super();
    this.code = 400;
    this.msg = '你已取消点赞';
    this.error_code = 60002;
  }
}
