const Movie = require('../models/movie');
const { Forbidden, NotFound } = require('../errors');
const {
  noMovies, movieNotFound, movieCannotRemove, movieRemove,
} = require('../utils/constants');

const getMovies = (req, res, next) => {
  Movie.find({})
    .orFail(new NotFound(noMovies))
    .then((movies) => res.send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description,
    image, trailer, thumbnail, movieId, nameRU, nameEN,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.send(movie))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const id = req.params._id;
  Movie.findById(id)
    .then((movie) => {
      if (!movie) {
        throw new NotFound(movieNotFound);
      }
      if (String(movie.owner) !== req.user._id) {
        throw new Forbidden(movieCannotRemove);
      }
      return movie.remove()
        .then(() => res.send({ message: movieRemove }))
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
