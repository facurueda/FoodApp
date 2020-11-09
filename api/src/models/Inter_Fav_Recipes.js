const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
      sequelize.define("Inter_Fav_Recipes", {
            idInterFavRecipes: {
                  type: DataTypes.INTEGER,
                  autoIncrement: true,
                  primaryKey: true,
                  notNull: false,
            },
            idFavouriteRecipe:{
                  type: DataTypes.INTEGER,
                  notNull: true
            },
            idRecipe:{
                  type: DataTypes.INTEGER,
                  notNull: true
            },
            userId: {
                  type: DataTypes.INTEGER,
                  notNull: true
            }
      });
};
