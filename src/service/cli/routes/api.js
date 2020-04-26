'use strict';

const {Router} = require(`express`);
const {nanoid} = require(`nanoid`);
const {HttpCode} = require(`../../../constants`);
const {
  createArticleValidation,
  updateArticleValidation,
  articleIdValidation,
  commentValidation,
  deleteCommentValidation,
  searchQueryValidation,
} = require(`../validation`);
const {
  checkArticleExist,
  getExistedArticle,
  getIndexArticle,
  createDataForArticleUpdate,
} = require(`../utils`);

const apiRouter = new Router();

apiRouter
  .get(`/articles`, getArticles)
  .post(`/articles`, createArticle)
  .get(`/articles/:articleId`, getArticle)
  .put(`/articles/:articleId`, updateArticle)
  .delete(`/articles/:articleId`, deleteArticle)
  .get(`/articles/:articleId/comments`, getArticleComments)
  .post(`/articles/:articleId/comments`, createArticleComment)
  .delete(`/articles/:articleId/comments/:commentId`, deleteArticleComment)
  .get(`/categories`, getCategories)
  .get(`/search`, findArticles);


function getArticles(req, res) {
  res.send(req.app.locals.data);
}

function createArticle(req, res) {
  const error = createArticleValidation(req);
  if (error) {
    res.status(HttpCode.BAD_REQUEST).send(error);
    return;
  }

  const {title, announce, fullText, category} = req.body;
  req.app.locals.data.push({
    id: nanoid(6),
    title,
    createdDate: new Date(),
    announce,
    fullText,
    category,
  });
  res.sendStatus(HttpCode.OK_CREATED);
}

function getArticle(req, res) {
  const error = articleIdValidation(req);
  if (error) {
    res.status(HttpCode.BAD_REQUEST).send(error);
    return;
  }
  const {articleId} = req.params;
  const article = getExistedArticle(req.app.locals.data, articleId);
  if (article) {
    res.send(article);
  } else {
    res.sendStatus(HttpCode.NOT_FOUND);
  }

}

function updateArticle(req, res) {
  const error = articleIdValidation(req) || updateArticleValidation(req);
  if (error) {
    res.status(HttpCode.BAD_REQUEST).send(error);
    return;
  }

  const {articleId} = req.params;
  const indexArticle = getIndexArticle(req.app.locals.data, articleId);
  if (indexArticle === -1) {
    res.sendStatus(HttpCode.NOT_FOUND);
  } else {
    req.app.locals.data[indexArticle] = {
      ...req.app.locals.data[indexArticle],
      ...createDataForArticleUpdate(req.body),
    };
    res.sendStatus(HttpCode.OK_NO_CONTENT);
  }
}

function deleteArticle(req, res) {
  const error = articleIdValidation(req);
  if (error) {
    res.status(HttpCode.BAD_REQUEST).send(error);
    return;
  }

  const {articleId} = req.params;
  const isArticleExist = checkArticleExist(req.app.locals.data, articleId);
  if (isArticleExist) {
    req.app.locals.data = req.app.locals.data.filter(({id}) => id !== articleId);
    res.sendStatus(HttpCode.OK_NO_CONTENT);
  } else {
    res.sendStatus(HttpCode.NOT_FOUND);
  }
}

function getArticleComments(req, res) {
  const error = articleIdValidation(req);
  if (error) {
    res.status(HttpCode.BAD_REQUEST).send(error);
    return;
  }

  const {articleId} = req.params;
  const article = getExistedArticle(req.app.locals.data, articleId);
  if (article) {
    res.send(article.comments || []);
  } else {
    res.sendStatus(HttpCode.NOT_FOUND);
  }
}

function createArticleComment(req, res) {
  const error = articleIdValidation(req) || commentValidation(req);
  if (error) {
    res.status(HttpCode.BAD_REQUEST).send(error);
    return;
  }

  const {articleId} = req.params;
  const indexArticle = getIndexArticle(req.app.locals.data, articleId);
  if (indexArticle === -1) {
    res.sendStatus(HttpCode.NOT_FOUND);
  } else {
    const {text} = req.body;
    const {comments = []} = req.app.locals.data[indexArticle];
    comments.push({id: nanoid(6), text});
    req.app.locals.data[indexArticle].comments = comments;
    res.send(HttpCode.OK_CREATED);
  }
}

function deleteArticleComment(req, res) {
  const error = deleteCommentValidation(req);
  if (error) {
    res.status(HttpCode.BAD_REQUEST).send(error);
    return;
  }

  const {articleId, commentId} = req.params;
  const indexArticle = getIndexArticle(req.app.locals.data, articleId);
  if (indexArticle === -1) {
    res.sendStatus(HttpCode.NOT_FOUND);
  } else {
    const {comments = []} = req.app.locals.data[indexArticle];
    req.app.locals.data[indexArticle].comments = comments.filter((comment) => comment.id !== commentId);
    res.sendStatus(HttpCode.OK_NO_CONTENT);
  }
}

function getCategories(req, res) {
  res.send(req.app.locals.data.reduce((acc, cur) => {
    const {category} = cur;
    category.forEach((item) => {
      if (!acc.includes(item)) {
        acc.push(item);
      }
    });
    return acc;
  }, []).sort());
}

function findArticles(req, res) {
  const error = searchQueryValidation(req);
  if (error) {
    res.status(HttpCode.BAD_REQUEST).send(error);
    return;
  }
  const {query} = req.query;
  res.send(req.app.locals.data.filter((item) => item.title.includes(query)));
}

module.exports = apiRouter;
