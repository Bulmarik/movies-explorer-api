const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  BadRequest, Unauthorized, NotFound, Conflict,
} = require('../errors');
const {
  userNotFound, emailAlreadyExist, incorrectData, invalidEmailOrPass,
} = require('../utils/constants');
const { JWT_SECRET, JWT_TTL } = require('../utils/config');

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFound(userNotFound);
      }
      return res.send({ email: user.email, name: user.name });
    })
    .catch(next);
};

const patchUser = (req, res, next) => {
  const { email, name } = req.body;
  User.findOne({ email })
    .then((mail) => {
      if (mail && (mail.id !== req.user._id)) {
        throw new Conflict(emailAlreadyExist);
      }
      return User.findByIdAndUpdate(
        req.user._id, { email, name },
        { new: true, runValidators: true },
      )
        .then((user) => {
          if (!user) {
            throw new NotFound(userNotFound);
          }
          return res.send({ email: user.email, name: user.name });
        })
        .catch(next);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new Conflict(emailAlreadyExist);
      }
      return bcrypt.hash(password, 10)
        .then((hash) => User.create({
          email, password: hash, name,
        }))
        .then(() => res.send({
          email, name,
        }))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            throw new BadRequest(incorrectData);
          }
        });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new Unauthorized(invalidEmailOrPass);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new Unauthorized(invalidEmailOrPass);
          }
          const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: JWT_TTL });
          return res.send(
            {
              email: user.email,
              name: user.name,
              _id: user._id,
              token,
            },
          );
        });
    })
    .catch(next);
};

module.exports = {
  getUser,
  patchUser,
  createUser,
  login,
};
