const { Router } = require('express');

const recipesRouter = require('./recipes.js');
const shoppingListRouter = require('./shoppingList.js')

const router = Router();

router.use('/recipes', recipesRouter);
router.use('/shoppingList', shoppingListRouter)

module.exports = router;