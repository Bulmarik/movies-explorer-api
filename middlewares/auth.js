const jwt = require('jsonwebtoken');
const { Unauthorized } = require('../errors');
const { authError } = require('../utils/constants');

const { JWT_SECRET } = require('../utils/config');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new Unauthorized(authError);
  }
  const token = authorization.replace(/^Bearer /, '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new Unauthorized(authError);
  }

  req.user = payload;
  next();
};

module.exports = auth;
