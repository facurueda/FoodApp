// const express = require("express");
// const fetch = require("node-fetch");
// const redis = require("redis");

// const PORT = process.env.PORT || 5000;
// const REDIS_PORT = process.env.PORT || 6379;

// const client = redis.createClient(REDIS_PORT);

// const app = express();

// // SET RESPONSE

// function setResponse(username, repos) {
//       return `<h2>${username} has ${repos} Github Repos</h2>`;
// }

// // MAKE REQUEST TO GITHUB FOR DATA
// async function getRepos(req, res, next) {
//       try {
//             console.log("Fetching Data...");

//             const { username } = req.params;

//             const response = await fetch(
//                   `https://api.github.com/users/${username}`
//             );

//             const data = await response.json();

//             const repos = data.public_repos;

//             // SET DATA TO REDIS

//             client.setex(username, 3600, repos);

//             res.send(setResponse(username, repos));
//       } catch (err) {
//             console.log(err);
//             res.status(500);
//       }
// }

// // CACHE MIDDLEWARE

// function cache(req, res, next) {
//       const { username } = req.params;

//       client.get(username, (err, data) => {
//             if (err) throw err;

//             if (data !== null) {
//                   res.send(setResponse(username, data));
//             } else {
//                   next();
//             }
//       });
// }

// app.get("/repos/:username", cache, getRepos);

// app.listen(5000, () => {
//       console.log(`App listening on port ${PORT}`);
// });

const server = require("./src/app.js");
require("dotenv/config");

const PORT = process.env.PORT || 5000;

const { conn } = require("./src/db");
// Syncing all the models at once.
// { force: true }

conn.sync().then(() => {
      server.listen(PORT, () => {
            console.log("%s listening at 5000"); // eslint-disable-line no-console
      });
});
