'use strict';

const {Router} = require(`express`);
const registerRouter = new Router();

registerRouter.get(`/`, (req, res) => res.render(`registration`));

module.exports = registerRouter;
