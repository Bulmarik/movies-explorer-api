const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validCreateUser = celebrate({
  body: {
    email: Joi.string().required()
      .custom((value, helpers) => {
        if (validator.isEmail(value)) {
          return value;
        }
        return helpers.message('Некорректный email');
      })
      .messages({ 'any.required': 'Обязательное поле' }),
    password: Joi.string().min(8).required()
      .messages({
        'string.min': 'Минимум 8 символов',
        'any.required': 'Обязательное поле',
      }),
    name: Joi.string().min(2).max(30)
    .messages({
      'string.min': 'Минимум 2 символа',
      'string.max': 'Максимум 30 символов',
    }),
  },
});

const validCreateMovie = celebrate({
  body: {
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((value, helper) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helper.message('Некорректная ссылка на постер');
    }),
    trailer: Joi.string().required().custom((value, helper) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helper.message('Некорректная ссылка на трейлер');
    }),
    thumbnail: Joi.string().required().custom((value, helper) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helper.message('Некорректная ссылка на миниатюру постера');
    }),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required()
  },
});

const validPatchUser = celebrate({
  body: {
    email: Joi.string().required()
      .custom((value, helpers) => {
        if (validator.isEmail(value)) {
          return value;
        }
        return helpers.message('Некорректный email');
      })
      .messages({ 'any.required': 'Обязательное поле' }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимум 2 символа',
        'string.max': 'Максимум 30 символов',
      }),
  },
});

const validLogin = celebrate({
  body: {
    email: Joi.string().required()
      .custom((value, helpers) => {
        if (validator.isEmail(value)) {
          return value;
        }
        return helpers.message('Некорректный email');
      })
      .messages({ 'any.required': 'Обязательное поле' }),
    name: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Минимум 2 символа',
        'string.max': 'Максимум 30 символов',
      }),
  },
});

module.exports = {
  validCreateUser,
  validCreateMovie,
  validPatchUser,
  validLogin,
};