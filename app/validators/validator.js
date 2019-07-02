const { LinValidator, Rule } = require('../../core/lin-validator-v2');
const { User } = require('../models/user');
const { LoginType, ArtType } = require('../lib/enum');

class PositiveIntegerValidator extends LinValidator {
  constructor() {
    super();
    this.id = [
      new Rule('isInt', '需要是正整数', {
        min: 1,
      }),
    ];
  }
}

class RegisterValidator extends LinValidator {
  constructor() {
    super();
    this.email = [
      new Rule('isEmail', '不符合Email规范'),
    ];
    this.password1 = [
      // 用户指定范围 123456 $^
      new Rule('isLength', '密码至少6个字符，最多32个字符', {
        min: 6,
        max: 32,
      }),
      new Rule('matches', '密码不符合规范', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]'),
    ];
    this.password2 = this.password1;
    this.nickname = [
      new Rule('isLength', '昵称不符合长度规范', {
        min: 4,
        max: 32,
      }),
    ];
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
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (user) {
      throw new Error('email已存在');
    }
  }
}

class TokenValidator extends LinValidator {
  constructor() {
    super();
    this.account = [
      new Rule('isLength', '不符合账号规则', {
        min: 4,
        max: 32,
      }),
    ];
    this.secret = [
      new Rule('isOptional'),
      new Rule('isLength', '至少6个字符', {
        min: 6,
        max: 128,
      }),
    ];
  }

  validateLoginType(vals) {
    if (!vals.body.type) {
      throw new Error('type是必须参数');
    }
    if (!LoginType.isThisType(vals.body.type)) {
      throw new Error('type参数不合法');
    }
  }
}

class NotEmptyValidator extends LinValidator {
  constructor() {
    super();
    this.token = [
      new Rule('isLength', '不允许为空', {
        min: 1,
      }),
    ];
  }
}

function checkType(vals) {
  let type = vals.body.type || vals.path.type;
  if (!type) {
    throw new Error('type是必须参数');
  }
  type = parseInt(type);

  if (!LoginType.isThisType(type)) {
    throw new Error('type参数不合法');
  }
}

function checkArtType(vals) {
  let type = vals.body.type || vals.path.type;
  if (!type) {
    throw new Error('type是必须参数');
  }
  type = parseInt(type);

  if (!ArtType.isThisType(type)) {
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

class ClassicValidator extends LikeValidator {

}

module.exports = {
  PositiveIntegerValidator,
  RegisterValidator,
  TokenValidator,
  NotEmptyValidator,
  LikeValidator,
  ClassicValidator,
};
