const rateLimit = require('express-rate-limit');

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
const PORT = process.env.PORT || '3000';
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/bitfilmsdb';
const JWT_SECRET = process.env.JWT_SECRET || 'abracadabra';
const JWT_TTL = process.env.JWT_TTL || '7d';

module.exports = {
  limiter,
  PORT,
  MONGODB_URL,
  JWT_SECRET,
  JWT_TTL,
};
