const server = require("express").Router();
const fetch = require("node-fetch");
const {
      FavouritesRecipes,
      Inter_Fav_Recipes,
      Recipes,
      Users,
} = require("../db.js");

const APIKEY = "871cc9ddc1ea4733830dd2c30e3d691a";


server.get("/random/:typeRecipe", async (req, res) => {
      try {

            const response = await fetch(
                  `https://api.spoonacular.com/recipes/random?apiKey=${APIKEY}&number=8`
            );

            const data = await response.json();

            res.send(data);
      } catch (err) {
            res.status(500);
      }
});

server.post('/search', async (req, res) => {
      const {input} = req.body;

      const response = await fetch(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&query=${input}&number=80`
      );

      const data = await response.json();

      res.send(data);
})

server.post("/search/:byIngredients", async (req, res) => {
      try {

            const { ingredients } = req.body;

            const response = await fetch(
                  `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${APIKEY}&ingredients=${ingredients}&number=80`
            );

            const data = await response.json();


            res.send(data);
      } catch (err) {
            res.status(500);
      }
});

server.post("/toShow", async (req, res) => {
      const { id } = req.body;

      const response = await fetch(
            `https://api.spoonacular.com/recipes/${id}/information?apiKey=${APIKEY}`
      );

      const data = await response.json();

      res.send(data);
});

server.post('/byCountries', async (req, res) => {
      const {country} = req.body;

      const response = await fetch(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&cuisine=${country}&number=60`
      );

      const data = await response.json();

      res.send(data);
})

server.post("/nutritionalInfo", async (req, res) => {
      const { id } = req.body;

      const response = await fetch(
            `https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=${APIKEY}`
      );

      const data = await response.json();

      res.send(data);
});

server.post("/addFavourites", async (req, res) => {

      Users.findOne({
            where: {
                  email: req.body.mailUser,
            },
      }).then((user) => {
            return Inter_Fav_Recipes.findAll({
                  where: {
                        userId: user.id,
                        idRecipe: req.body.recipeId,
                  },
            }).then((inter) => {
                  if (inter.length > 0) {
                  } else {
                        return FavouritesRecipes.create({
                              id: user.id,
                        }).then((favRec) => {
                              return Recipes.findOne({
                                    where: {
                                          idRecipe: req.body.recipeId,
                                    },
                              }).then((recip) => {
                                    if (recip) {
                                          return Inter_Fav_Recipes.create({
                                                idFavouriteRecipe:
                                                      favRec.idFavouriteRecipe,
                                                idRecipe: recip.idRecipe,
                                                userId: user.id,
                                          });
                                    } else {
                                          return Recipes.create({
                                                idRecipe: req.body.recipeId,
                                                recipeName: req.body.recipeName,
                                                imageUrl: req.body.imageUrl,
                                          }).then((recCreated) => {
                                                return Inter_Fav_Recipes.create(
                                                      {
                                                            idFavouriteRecipe:
                                                                  favRec.idFavouriteRecipe,
                                                            idRecipe:
                                                                  recCreated.idRecipe,
                                                            userId: user.id,
                                                      }
                                                );
                                          })
                                    }
                              });
                        });
                  }
            })
      })
      res.send('Created')
});

server.post("/getFavouritesRecipes", (req, res) => {
      Users.findOne({
            where: {
                  email: req.body.email,
            },
      }).then((user) => {
            FavouritesRecipes.findAll({
                  where: {
                        id: user.id,
                  },
                  include: [
                        {
                              model: Recipes,
                              as: "favourites",
                        },
                  ],
            }).then((favRec) => {
                  console.log(favRec)
                  res.send(favRec);
            });
      });
});

server.delete("/deleteFavouriteRecipe", (req, res) => {
      Inter_Fav_Recipes.findOne({
            where: {
                  idRecipe: req.body.recipeId,
            },
      })
            .then((inter) => {
                  FavouritesRecipes.destroy({
                        where: {
                              idFavouriteRecipe: inter.idFavouriteRecipe,
                        },
                  });
            })
            .then(() => {
                  Recipes.destroy({
                        where: {
                              idRecipe: req.body.recipeId,
                        },
                  });
            });

      Users.findOne({
            where: {
                  email: req.body.email,
            },
      }).then((user) => {
            FavouritesRecipes.findAll({
                  where: {
                        id: user.id,
                  },
                  include: [
                        {
                              model: Recipes,
                              as: "favourites",
                        },
                  ],
            }).then((favRec) => {
                  res.send(favRec);
            });
      });
});

module.exports = server;
