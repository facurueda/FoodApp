const { Router } = require('express');
// import all routers;
const recipesRouter = require('./recipes.js');

const fetch = require("node-fetch");

const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
router.use('/recipes', recipesRouter);

module.exports = router;