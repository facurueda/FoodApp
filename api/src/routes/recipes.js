const server = require("express").Router();
const redis = require("redis");
const fetch = require("node-fetch");
const axios = require("axios");
const Sequelize = require("sequelize");
const {
      FavouritesRecipes,
      Inter_Fav_Recipes,
      Recipes,
      Users,
} = require("../db.js");

const REDIS_PORT = process.env.PORT || 6379;

const client = redis.createClient(REDIS_PORT);

const APIKEY = "871cc9ddc1ea4733830dd2c30e3d691a";

const CACHE = (req, res, next) => {
      const KEY = Object.values(req.params)[0];

      client.get(KEY, (err, data) => {
            if (err) throw "errr";

            if (data !== null) {
                  res.send(data);
            } else {
                  next();
            }
      });
};

server.get("/random/:typeRecipe", CACHE, async (req, res) => {
      try {
            console.log("Fetching Data...");

            const { typeRecipe } = req.params;

            const response = await fetch(
                  `https://api.spoonacular.com/recipes/random?apiKey=${APIKEY}&number=4`
            );

            const data = await response.json();

            client.setex(typeRecipe, 3600, JSON.stringify(data));

            res.send(data);
      } catch (err) {
            res.status(500);
      }
});

server.post("/search/:byIngredients", async (req, res) => {
      // QUITE EL CACHE PORQUE SI NO NO FUNCIONA!

      try {
            const { byIngredients } = req.params;

            const { ingredients } = req.body;

            const response = await fetch(
                  `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${APIKEY}&ingredients=${ingredients}&number=8`
            );

            const data = await response.json();

            console.log('DATA', data)

            client.setex(byIngredients, 3600, JSON.stringify(data));

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
                        console.log('DUPLICATED')
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

// server.post("/", async (req, res) => {
//       const myUser = new User(req.body)
//       await myUser.save();
//       res.send(myUser)
//       console.log("ENTRO");
// });

// server.get("/randomRecipes", cache, (req, res) => {
//       var config = {
//             method: "get",
//             url: `https://api.spoonacular.com/recipes/random?apiKey=${APIKEY}&number=4`,
//             headers: {
//                   Cookie:
//                         "__cfduid=d68bdc4452e6af9f5c2f2e24fad7607e41602855582",
//             },
//       };
//       axios(config).then((response) => {
//             res.send(response.data);
//       });
// });

module.exports = server;
