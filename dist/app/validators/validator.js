"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddShortCommentValidator = exports.SearchValidator = exports.ClassicValidator = exports.LikeValidator = exports.NotEmptyValidator = exports.TokenValidator = exports.RegisterValidator = exports.PositiveIntegerValidator = void 0;

var _linValidatorV = require("../../core/lin-validator-v2");

var _user = require("../models/user");

var _enum = require("../lib/enum");

class PositiveIntegerValidator extends _linValidatorV.LinValidator {
  constructor() {
    super();
    this.id = [new _linValidatorV.Rule('isInt', '需要是正整数', {
      min: 1
    })];
  }

}

exports.PositiveIntegerValidator = PositiveIntegerValidator;

class RegisterValidator extends _linValidatorV.LinValidator {
  constructor() {
    super();
    this.email = [new _linValidatorV.Rule('isEmail', '不符合Email规范')];
    this.password1 = [// 用户指定范围 123456 $^
    new _linValidatorV.Rule('isLength', '密码至少6个字符，最多32个字符', {
      min: 6,
      max: 32
    }), new _linValidatorV.Rule('matches', '密码不符合规范', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')];
    this.password2 = this.password1;
    this.nickname = [new _linValidatorV.Rule('isLength', '昵称不符合长度规范', {
      min: 4,
      max: 32
    })];
  }

  validatePassword(vals) {
    const psw1 = vals.body.password1;
    const psw2 = vals.body.password2;

    if (psw1 !== psw2) {
      throw new Error('两个密码必须相同');
    }
  }

  async validateEmail(vals) {
    const email = vals.body.email;
    const user = await _user.User.findOne({
      where: {
        email: email
      }
    });

    if (user) {
      throw new Error('email已存在');
    }
  }

}

exports.RegisterValidator = RegisterValidator;

class TokenValidator extends _linValidatorV.LinValidator {
  constructor() {
    super();
    this.account = [new _linValidatorV.Rule('isLength', '不符合账号规则', {
      min: 4,
      max: 32
    })];
    this.secret = [new _linValidatorV.Rule('isOptional'), new _linValidatorV.Rule('isLength', '至少6个字符', {
      min: 6,
      max: 128
    })];
  }

  validateLoginType(vals) {
    if (!vals.body.type) {
      throw new Error('type是必须参数');
    }

    if (!_enum.LoginType.isThisType(vals.body.type)) {
      throw new Error('type参数不合法');
    }
  }

}

exports.TokenValidator = TokenValidator;

class NotEmptyValidator extends _linValidatorV.LinValidator {
  constructor() {
    super();
    this.token = [new _linValidatorV.Rule('isLength', '不允许为空', {
      min: 1
    })];
  }

}

exports.NotEmptyValidator = NotEmptyValidator;

function checkType(vals) {
  let type = vals.body.type || vals.path.type;

  if (!type) {
    throw new Error('type是必须参数');
  }

  type = parseInt(type);

  if (!_enum.LoginType.isThisType(type)) {
    throw new Error('type参数不合法');
  }
}

function checkArtType(vals) {
  let type = vals.body.type || vals.path.type;

  if (!type) {
    throw new Error('type是必须参数');
  }

  type = parseInt(type);

  if (!_enum.ArtType.isThisType(type)) {
    throw new Error('type参数不合法');
  }
}

class Checker {
  constructor(type) {
    this.enumType = type;
  }

  check(vals) {
    let type = vals.body.type || vals.path.type;

    if (!type) {
      throw new Error('type是必须参数');
    }

    type = parseInt(type);

    if (!this.enumType.isThisType(type)) {
      throw new Error('type参数不合法');
    }
  }

}

class LikeValidator extends PositiveIntegerValidator {
  constructor() {
    super();
    this.validateType = checkArtType;
  }

}

exports.LikeValidator = LikeValidator;

class ClassicValidator extends LikeValidator {}

exports.ClassicValidator = ClassicValidator;

class SearchValidator extends _linValidatorV.LinValidator {
  constructor() {
    super();
    this.q = [new _linValidatorV.Rule('isLength', '搜索关键词不能为空', {
      min: 1,
      max: 16
    })];
    this.start = [new _linValidatorV.Rule('isInt', '不符合规范', {
      min: 0,
      max: 60000
    }), new _linValidatorV.Rule('isOptional', '', 0)];
    this.count = [new _linValidatorV.Rule('isInt', '不符合规范', {
      min: 1,
      max: 20
    }), new _linValidatorV.Rule('isOptional', '', 20)];
  }

}

exports.SearchValidator = SearchValidator;

class AddShortCommentValidator extends PositiveIntegerValidator {
  constructor() {
    super();
    this.content = [new _linValidatorV.Rule('isLength', '必须在1到12个字符之间', {
      min: 1,
      max: 12
    })];
  }

}

exports.AddShortCommentValidator = AddShortCommentValidator;