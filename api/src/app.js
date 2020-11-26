const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/index.js");
const cors = require("cors");
var logger = require("morgan");

const server = express();
server.name = "API";
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cors());
server.use(logger("dev"));

server.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*"); 
      res.header("Access-Control-Allow-Credentials", "true");
      res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
      );
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
      res.header("Content-Type", "application/x-www-form-urlencoded");
      if (req.methods === "OPTIONS") return res.send("ok");
      next();
});

server.use("/", routes);

server.use((err, req, res, next) => {
      const status = err.status || 500;
      const message = err.message || err;
      console.error(err);
      res.status(status).send(message);
});

module.exports = server;
