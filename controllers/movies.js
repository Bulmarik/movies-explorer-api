const Movie = require('../models/movie');
// const { Forbidden, NotFound } = require('../errors');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const { country, director, duration, year, description, image, trailer, thumbnail, movieId, nameRU, nameEN } = req.body;
  Movie.create({ country, director, duration, year, description, image, trailer, thumbnail, movieId, nameRU, nameEN })
    .then((movie) => res.status(200).send(movie))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const id = req.params._id;
  Movie.findById(id)
    .then((movie) => {
      if (!movie) {
        throw new NotFound('Данный фильм не найден');
      }
      if (String(movie.owner) !== req.user._id) {
        throw new Forbidden('Нельзя удалить чужой фильм');
      }
      return Movie.findByIdAndRemove(movie._id)
        .then(() => res.status(200).send({ message: 'Фильм удален' }))
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};