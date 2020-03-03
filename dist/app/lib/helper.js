"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.success = success;

function success(msg, errorCode) {
  throw new global.errs.Success(msg, errorCode);
}