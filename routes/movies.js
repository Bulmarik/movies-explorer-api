const router = require('express').Router();
const { validCreateMovie } = require('../validator/validator');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', validCreateMovie, createMovie);
router.delete('/movieId ', deleteMovie);

module.exports = router;