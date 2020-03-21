import jwt from 'jsonwebtoken';

export const generateToken = function(uid, scope) {
  const secretKey = global.config.security.secretKey;
  const expiresIn = global.config.security.expiresIn;
  const token = jwt.sign({ uid, scope }, secretKey, { expiresIn: expiresIn });
  return token;
};
