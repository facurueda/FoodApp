const server = require('express').Router();
const redis = require("redis");
const fetch = require("node-fetch");

const PORT = process.env.PORT || 5000;
const REDIS_PORT = process.env.PORT || 6379;

const client = redis.createClient(REDIS_PORT);

function setResponse(username, repos) {
      return `<h2>${username} has ${repos} Github Repos</h2>`;
}

// MAKE REQUEST TO GITHUB FOR DATA
async function getRepos(req, res, next) {
      try {
            console.log("Fetching Data...");

            const { username } = req.params;

            const response = await fetch(
                  `https://api.github.com/users/${username}`
            );

            const data = await response.json();

            const repos = data.public_repos;

            // SET DATA TO REDIS

            client.setex(username, 3600, repos);

            res.send(setResponse(username, repos));
      } catch (err) {
            console.log(err);
            res.status(500);
      }
}

// CACHE MIDDLEWARE

function cache(req, res, next) {
      const { username } = req.params;

      client.get(username, (err, data) => {
            if (err) throw err;

            if (data !== null) {
                  res.send(setResponse(username, data));
            } else {
                  next();
            }
      });
}

server.get("/repos/:username", cache, getRepos);


module.exports = server;