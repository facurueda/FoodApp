const express = require('express');
const fetch = require("node-fetch");
const redis = require("redis");
const routes = require('./routes/index.js');


const server = express();
server.name = 'API';





// server.use(cors());
// server.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3001'); // update to match the domain you will make the request from
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header('Content-Type', 'application/x-www-form-urlencoded',)
//   if (req.methods === 'OPTIONS') return res.send('ok');
//   next();
// });
////////////  -------------------- PARA HABILITAR PASSPORT.JS

// server.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false
// }))
// server.use(passport.initialize())
// server.use(passport.session())
// server.use(flash())


////////////  --------------------

server.use('/', routes);
// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});
module.exports = server;