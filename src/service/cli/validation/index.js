'use strict';

const Joi = require(`@hapi/joi`);

const newArticleScheme = Joi.object().keys({
  title: Joi.string().min(6).required(),
  announce: Joi.string().min(30).required(),
  fullText: Joi.string().min(100).required(),
  category: Joi.array().items(Joi.string()).min(1).required(),
});

const updateArticleScheme = Joi.object().keys({
  title: Joi.string().min(6).optional(),
  announce: Joi.string().min(30).optional(),
  fullText: Joi.string().min(100).optional(),
  category: Joi.array().items(Joi.string()).min(1).optional(),
}).or(`title`, `announce`, `fullText`, `category`);

const commentScheme = Joi.object().keys({
  id: Joi.string(),
  text: Joi.string().min(5).required(),
});

const createArticleValidation = function ({body}) {
  const {error = {}} = newArticleScheme.validate(body);
  return error.details;
};

const updateArticleValidation = function ({body}) {
  const {error = {}} = updateArticleScheme.validate(body);
  return error.details;
};

const articleIdValidation = function ({params}) {
  const {error = {}} = Joi.object().keys({
    articleId: Joi.string().required(),
  }).validate(params);
  return error.details;
};

const commentValidation = function ({body}) {
  const {error = {}} = commentScheme.validate(body);
  return error.details;
};

const deleteCommentValidation = function ({params}) {
  const {error = {}} = Joi.object().keys({
    articleId: Joi.string().required(),
    commentId: Joi.string().required(),
  }).validate(params);
  return error.details;
};

const searchQueryValidation = function ({query}) {
  const {error = {}} = Joi.object().keys({
    query: Joi.string().min(3).required(),
  }).validate(query);
  return error.details;
};

module.exports = {
  createArticleValidation,
  articleIdValidation,
  updateArticleValidation,
  commentValidation,
  deleteCommentValidation,
  searchQueryValidation,
};
