export function success(msg, errorCode) {
  throw new global.errs.Success(msg, errorCode);
}
