require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB } = process.env;
const sequelize = new Sequelize(
      `postgres://facurueda:Gregorio!38644499@foodapp.covwwqu8cgki.us-east-1.rds.amazonaws.com:5432/foodapp`
      //     `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:5432/${DB}`
);
const basename = path.basename(__filename);
const modelDefiners = [];
fs.readdirSync(path.join(__dirname, "/models"))
      .filter(
            (file) =>
                  file.indexOf(".") !== 0 &&
                  file !== basename &&
                  file.slice(-3) === ".js"
      )
      .forEach((file) => {
            modelDefiners.push(require(path.join(__dirname, "/models", file)));
      });
modelDefiners.forEach((model) => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
      entry[0][0].toUpperCase() + entry[0].slice(1),
      entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);
const {
      Users,
      Inter_Fav_Recipes,
      Recipes,
      ShoppingLists,
      FavouritesRecipes,
} = sequelize.models;
Users.hasMany(ShoppingLists, {
      foreignKey: "id",
});
Users.hasMany(FavouritesRecipes, {
      foreignKey: "id",
});
FavouritesRecipes.belongsToMany(Recipes, {
      through: "Inter_Fav_Recipes",
      foreignKey: "idFavouriteRecipe",
      as: "favourites",
});
Recipes.belongsToMany(FavouritesRecipes, {
      through: "Inter_Fav_Recipes",
      foreignKey: "idRecipe",
      as: "recipes",
});

module.exports = {
      ...sequelize.models,
      conn: sequelize,
};
