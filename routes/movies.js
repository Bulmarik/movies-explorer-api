const router = require('express').Router();
const { validCreateMovie, validIdMovie } = require('../middlewares/validator');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', validCreateMovie, createMovie);
router.delete('/:_id', validIdMovie, deleteMovie);

module.exports = router;
