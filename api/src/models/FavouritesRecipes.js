const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
      sequelize.define("FavouritesRecipes", {
            idFavouriteRecipe: {
                  type: DataTypes.INTEGER,
                  autoIncrement: true,
                  primaryKey: true,
                  allowNull: false,
            },
      });
};
