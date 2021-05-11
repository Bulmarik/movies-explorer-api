const router = require('express').Router();
const { validCreateMovie } = require('../validator/validator');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const auth = require('../middlewares/auth.js');

router.use(auth);
router.get('/', getMovies);
router.post('/', validCreateMovie, createMovie);
router.delete('/movieId ', deleteMovie);

module.exports = router;
