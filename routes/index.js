const router = require('express').Router();
const { NotFound } = require('../errors');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { createUser, login } = require('../controllers/users');
const { validLogin, validCreateUser } = require('../middlewares/validator');
const { pageNotFound } = require('../utils/constants');
const auth = require('../middlewares/auth.js');

router.post('/signin', validLogin, login);
router.post('/signup', validCreateUser, createUser);
router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);

router.use('*', auth, () => {
  throw new NotFound(pageNotFound);
});

module.exports = router;
