const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const {
  invalidEmail, requiredField, minPassSimbols, minNameSimbols, maxNameSimbols,
  invalidImageUrl, invalidTrailerUrl, invalidThumbnailUrl, lengthIdSymbol, invalidNumbSystem,
} = require('../utils/constants');

const validCreateUser = celebrate({
  body: {
    email: Joi.string().required()
      .custom((value, helpers) => {
        if (validator.isEmail(value, { require_protocol: true })) {
          return value;
        }
        return helpers.message(invalidEmail);
      })
      .messages({ 'any.required': requiredField }),
    password: Joi.string().min(8).required()
      .messages({
        'string.min': minPassSimbols,
        'any.required': requiredField,
      }),
    name: Joi.string().min(2).max(30).required()
      .messages({
        'string.min': minNameSimbols,
        'string.max': maxNameSimbols,
        'any.required': requiredField,
      }),
  },
});

const validPatchUser = celebrate({
  body: {
    email: Joi.string().required()
      .custom((value, helpers) => {
        if (validator.isEmail(value, { require_protocol: true })) {
          return value;
        }
        return helpers.message(invalidEmail);
      })
      .messages({ 'any.required': requiredField }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': minNameSimbols,
        'string.max': maxNameSimbols,
        'any.required': requiredField,
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
      if (validator.isURL(value, { require_protocol: true })) {
        return value;
      }
      return helper.message(invalidImageUrl);
    }),
    trailer: Joi.string().required().custom((value, helper) => {
      if (validator.isURL(value, { require_protocol: true })) {
        return value;
      }
      return helper.message(invalidTrailerUrl);
    }),
    thumbnail: Joi.string().required().custom((value, helper) => {
      if (validator.isURL(value, { require_protocol: true })) {
        return value;
      }
      return helper.message(invalidThumbnailUrl);
    }),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  },
});

const validIdMovie = celebrate({
  params: {
    _id: Joi.string().required().length(24).hex()
      .messages({
        'string.length': lengthIdSymbol,
        'string.hex': invalidNumbSystem,
      }),
  },
});

const validLogin = celebrate({
  body: {
    email: Joi.string().required()
      .custom((value, helpers) => {
        if (validator.isEmail(value, { require_protocol: true })) {
          return value;
        }
        return helpers.message(invalidEmail);
      })
      .messages({ 'any.required': requiredField }),
    password: Joi.string().min(8).required()
      .messages({
        'string.min': minPassSimbols,
        'any.required': requiredField,
      }),
  },
});

module.exports = {
  validCreateUser,
  validPatchUser,
  validCreateMovie,
  validIdMovie,
  validLogin,
};
