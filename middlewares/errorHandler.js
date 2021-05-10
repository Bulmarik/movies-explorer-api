const { serverError } = require('../constants/constants');

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? serverError
      : message,
  });
  return next();
};

module.exports = errorHandler;
