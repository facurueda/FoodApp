const server = require("express").Router();
const redis = require("redis");
const fetch = require("node-fetch");
const axios = require("axios");

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
            console.log(req.body);

            const { byIngredients } = req.params;

            const { ingredients } = req.body;

            const response = await fetch(
                  `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${APIKEY}&ingredients=${ingredients}&number=8`
            );

            const data = await response.json();

            client.setex(byIngredients, 3600, JSON.stringify(data));

            res.send(data);
      } catch (err) {
            res.status(500);
      }
});

server.get("/", (req, res) => {
      console.log("ENTRO");
});

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
