const { Router } = require('express');

const recipesRouter = require('./recipes.js');

const router = Router();

router.use('/recipes', recipesRouter);

module.exports = router;