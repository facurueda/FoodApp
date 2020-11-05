const server = require("express").Router();
const redis = require("redis");
const fetch = require("node-fetch");
const axios = require("axios");
const Sequelize = require("sequelize");
const { ShoppingLists, Users } = require("../db.js");

server.post("/Create", async (req, res) => {
      const { userEmail, recypeByIngredients } = req.body;

      console.log('body',req.body)

      Users.findOne({
            where: {
                  email: userEmail,
            },
      }).then((user) => {
            console.log('user', user)
            ShoppingLists.create({
                  name: recypeByIngredients.title,
                  checked: false,
                  ingredients: recypeByIngredients.extendedIngredients,
                  id: user.id,
            });
      });

      res.send("ShoppingListCreada");
});

server.post("/GetAll", async (req, res) => {
      const { userEmail } = req.body;

      Users.findOne({
            where: {
                  email: userEmail,
            },
      }).then( user => {
            return ShoppingLists.findAll({
                  where: {
                        id: user.id
                  }
            })
      }).then( allSL => {
            res.send(allSL);
      });

});

module.exports = server;
