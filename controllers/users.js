const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
    BadRequest, Unauthorized, NotFound, Conflict,
  } = require('../errors');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFound('Данный пользователь не найден');
      }
      return res.status(200).send({ email: user.email, name: user.name });
    })
    .catch(next);
  };

const patchUser = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(req.user._id, { email, name }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFound('Данный пользователь не найден');
      }
      return res.status(200).send({ email: user.email, name: user.name });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new Conflict('Данный пользователь уже существует');
      }
      return bcrypt.hash(password, 10)
        .then((hash) => User.create({
          email, password: hash, name
        }))
        .then(() => res.status(201).send({
          email, name
        }))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            throw new BadRequest('Переданы некорректные данные');
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
        throw new Unauthorized('Неправильные email или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new Unauthorized('Неправильные email или пароль');
          }
          const token = jwt.sign({ _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : 'abracadabra',
            { expiresIn: '7d' });
          return res.send(
            {
              email: user.email,
              name: user.name,
              _id: user._id,
              token
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