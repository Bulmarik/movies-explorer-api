const router = require('express').Router();
const { NotFound } = require('../errors');
const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth.js');
const { createUser, login } = require('../controllers/users');
const { validLogin, validCreateUser } = require('../validator/validator');

router.post('/signin', validLogin, login);
router.post('/signup', validCreateUser, createUser);
router.use(auth);
router.use('/users', userRouter);
router.use('/movie', movieRouter);
router.use('*', () => {
  throw new NotFound('Страница не найдена');
});

module.exports = router;