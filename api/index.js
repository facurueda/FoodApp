const server = require("./src/app.js");
require("dotenv/config");

const PORT = process.env.PORT || 5000;

const { conn } = require("./src/db");
// { force: true }
conn.sync().then(() => {
      server.listen(PORT, () => {
            console.log("%s listening at 5000");
      });
});
