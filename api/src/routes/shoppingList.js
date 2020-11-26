const server = require("express").Router();
const { ShoppingLists, Users } = require("../db.js");

server.post("/Create", async (req, res) => {
      const { userEmail, recypeByIngredients } = req.body;

      console.log("body", req.body);

      Users.findOne({
            where: {
                  email: userEmail,
            },
      }).then((user) => {
            console.log("user", user);
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
      })
            .then((user) => {
                  return ShoppingLists.findAll({
                        where: {
                              id: user.id,
                        },
                  });
            })
            .then((allSL) => {
                  res.send(allSL);
            });
});

server.delete("/Delete", (req, res) => {

      const {userEmail, idShoppingList} = req.body

      ShoppingLists.destroy({
            where: {
                  idShoppingList: idShoppingList
            },
      }).then((e) => {
            Users.findOne({
                  where: {
                        email: userEmail,
                  },
            })
                  .then((user) => {
                        return ShoppingLists.findAll({
                              where: {
                                    id: user.id,
                              },
                        });
                  })
                  .then((allSL) => {
                        res.send(allSL);
                  });
      });
});

module.exports = server;
