const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
      sequelize.define("Inter_Shop_Recipes", {
            idInterShopRecipes: {
                  type: DataTypes.INTEGER,
                  autoIncrement: true,
                  primaryKey: true,
                  allowNull: false,
            },
      });
};
