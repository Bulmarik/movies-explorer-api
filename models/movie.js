const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Types.ObjectId;

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator(url) {
        return validator.isURL(url);
      },
      message: 'Некорректная ссылка на постер',
    },
  },
  trailer: {
    type: String,
    validate: {
      validator(url) {
        return validator.isURL(url);
      },
      message: 'Некорректная ссылка на трейлер',
    },
  },
  thumbnail: {
    type: String,
    validate: {
      validator(url) {
        return validator.isURL(url);
      },
      message: 'Некорректная ссылка на миниатюру постера',
    },
  },
  owner: {
    type: ObjectId,
    required: true,
  },
  movieId: {
    type: ObjectId,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);