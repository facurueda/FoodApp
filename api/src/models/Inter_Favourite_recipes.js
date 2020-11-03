const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
      sequelize.define("Inter_Favourite_Recipes", {
            idInterFavouriteRecipes: {
                  type: DataTypes.INTEGER,
                  autoIncrement: true,
                  primaryKey: true,
                  allowNull: false,
            },
      });
};
