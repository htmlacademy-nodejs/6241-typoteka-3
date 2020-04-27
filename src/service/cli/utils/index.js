'use strict';

const checkArticleExist = (data = [], offerId) => data.some(({id}) => id === offerId);

const getExistedArticle = (data = [], offerId) => data.find(({id}) => id === offerId);

const getIndexArticle = (data = [], offerId) => data.findIndex(({id}) => id === offerId);

const createDataForArticleUpdate = (article = {}) => {
  const {title, announce, fullText, category} = article;
  return {
    ...(title ? {title} : {}),
    ...(announce ? {announce} : {}),
    ...(fullText ? {fullText} : {}),
    ...(category ? {category} : {}),
  };
};

module.exports = {
  checkArticleExist,
  getExistedArticle,
  getIndexArticle,
  createDataForArticleUpdate,
};
