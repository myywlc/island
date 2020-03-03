"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArtType = exports.LoginType = void 0;

function isThisType(val) {
  for (let key in this) {
    if (this[key] === val) {
      return true;
    }
  }

  return false;
}

const LoginType = {
  USER_MINI_PROGRAM: 100,
  USER_EMAIL: 101,
  USER_MOBILE: 102,
  ADMIN_EMAIL: 200,
  isThisType
};
exports.LoginType = LoginType;
const ArtType = {
  MOVIE: 100,
  MUSIC: 200,
  SENTENCE: 300,
  BOOK: 400,
  isThisType
};
exports.ArtType = ArtType;